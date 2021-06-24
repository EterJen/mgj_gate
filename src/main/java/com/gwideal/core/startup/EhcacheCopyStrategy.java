package com.gwideal.core.startup;

import net.sf.ehcache.Element;
import net.sf.ehcache.store.compound.ReadWriteCopyStrategy;

import java.io.*;

public class EhcacheCopyStrategy implements ReadWriteCopyStrategy<Element> {


    private  Object deepCopy(Object src) throws IOException, ClassNotFoundException {
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
        ObjectOutputStream out = new ObjectOutputStream(byteOut);
        out.writeObject(src);

        ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
        ObjectInputStream in = new ObjectInputStream(byteIn);
        return in.readObject();
    }

    @Override
    public Element copyForWrite(Element value, ClassLoader loader) {
        if(value != null){
            Object temp=(Serializable)value.getObjectValue();
            try {
                return new Element(value.getObjectKey(),deepCopy(temp));
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (ClassNotFoundException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return value;
    }

    @Override
    public Element copyForRead(Element storedValue, ClassLoader loader) {
        if(storedValue != null){
            Object temp=(Serializable)storedValue.getObjectValue();
            try {
                return new Element(storedValue.getObjectKey(),deepCopy(temp));
            } catch (ClassNotFoundException | IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return storedValue;
    }
}
