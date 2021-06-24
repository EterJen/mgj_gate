
package com.gwideal.core.visual;


import com.gwideal.core.basic.l2.service.RedisService;
import com.mxgraph.canvas.mxGraphicsCanvas2D;
import com.mxgraph.canvas.mxICanvas2D;
import com.mxgraph.reader.mxSaxOutputHandler;
import com.mxgraph.util.mxUtils;
import com.mxpdf.text.Document;
import com.mxpdf.text.DocumentException;
import com.mxpdf.text.pdf.PdfWriter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;
import java.util.*;


@Controller
@RequestMapping("/visualWF")
public class VisualController {
    public static Log log = LogFactory.getLog(VisualController.class);
    @Autowired
    RedisService redisService;

    /*@Autowired
    AuditInfoService auditInfoService;
    @Autowired
    RProcessInstanceService processInstanceService;

    @Autowired
    ProcessDefVersionService processDefVersionService;

    @Autowired
    RProcessInstanceService rProcessInstanceService;*/


    @Value("${workflow.processDefDir}")
    String dirStr;

    @Value("${workflow.linuxProcessDefDir}")
    String linuxDirStr;

    /*@Value("${ftp_address}")
    String ftpAddress;

    @Value("${ftp_port}")
    int ftpPort;

    @Value("${ftp_username}")
    String ftpUsername;

    @Value("${ftp_password}")
    String ftpPassword;

    @Value("${ftp_basepath}")
    String ftpBasepath;*/

    @Value("${InetAddressList}")
    String InetAddressList;

    private transient SAXParserFactory parserFactory = SAXParserFactory.newInstance();
    protected transient Hashtable<String, Image> imageCache = new Hashtable<String, Image>();

    @RequestMapping("/saveFormAction")
    public void saveFormAction(HttpServletRequest request, HttpServletResponse response) throws IOException {

    }

    @RequestMapping("/reloadXml")
    public void reloadXml(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //rProcessInstanceService.initProcessDef(request.getParameter("id"));
    }

    @RequestMapping("/save")
    public void save(HttpServletRequest request, HttpServletResponse response) throws IOException {
        /*if (request.getContentLength() < Constants.MAX_REQUEST_SIZE) {
            String xml = request.getParameter("xml");
            String processVersionId = request.getParameter("processVersionId");
            ProcessDefVersion pdv = processDefVersionService.read(new BigDecimal(processVersionId));


            if (xml != null && xml.length() > 0) {
                // Decoding is optional (no plain text values allowed)
                if (xml != null && xml.startsWith("%3C")) {
                    xml = URLDecoder.decode(xml, "UTF-8");
                }

                String fileName = "";
                if (pdv.getFilePath() == null) {
                    fileName = UUID.randomUUID().toString();
                } else {
                    fileName = pdv.getFileName();
                }
                pdv.setFilePath(fileName + ".xml");
                pdv.setFileName(fileName);
                processDefVersionService.update(pdv);

                //把input流上传到服务器
                InputStream inputStreamFtp = new ByteArrayInputStream(xml.getBytes());
                *//*判断是windows服务器还是linux服务器*//*
                String realFileName="";
                if (SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)) {
                    realFileName=dirStr;
                }else {
                    realFileName=linuxDirStr;
                }
                File tempFile = new File(realFileName);// 断判文件夹是否存在,如果不存在则创建文件夹
                if (!tempFile.exists()) {
                    tempFile.mkdirs();
                }
                int contentlen;
                byte b[] = new byte[1024];
                File f = new File(realFileName+pdv.getFilePath());
                FileOutputStream o = new FileOutputStream(f);
                *//*StringBuffer out = new StringBuffer();
                System.out.println( out.toString());*//*
                while ((contentlen = inputStreamFtp.read(b)) != -1)
                {
                    o.write(b, 0, contentlen);
                }
                o.close();
                inputStreamFtp.close();
                redisService.delProcessTemplate(pdv);
                redisService.selProcessTemplate(pdv);
                // TODO Auto-generated catch block
                response.setCharacterEncoding("UTF-8");
                response.setContentType("text/html; charset=UTF-8");
                PrintWriter out = response.getWriter();
                out.write("保存成功");
                out.flush();
                out.close();
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } else {
            response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);
        }*/
    }

    /**
     * 根据流程获取流程节点
     *
     * @param bean
     * @return
     */
    /*@RequestMapping("/getNodeList")
    @ResponseBody
    public ResultInfo<DNode> getNodeList(@RequestBody ProcessDefVersion bean) throws IOException {
        ResultInfo<DNode> ri = new ResultInfo<DNode>();
        DProcess dProcess = null;
        try {
            dProcess = redisService.selProcessTemplate(bean);
            if (dProcess != null) {
                ri.setResultType("success");
            } else {
                ri.setResultType("fail");
            }
            ri.setBeanList(dProcess.getNodes());
        } catch (Exception e) {

            e.printStackTrace();
        }
        return ri;
    }*/

    /**
     * 根据pdv获取流
     *
     * @param pdv
     * @return
     */
    /*private InputStream getInputStream(ProcessDefVersion pdv) {
        // TODO Auto-generated method stub
        if (pdv.getFilePath() == null) {
            return null;
        }
        InputStream in = null;
        try {
            String dirStrUrl = "";
            if (System.getProperties().getProperty("os.name").contains("Windows")) {
                dirStrUrl = SystemUtils.getRootPath() + dirStr;
            } else {
                dirStrUrl = SystemUtils.getRootPath() + linuxDirStr;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return in;
    }*/


	/*@RequestMapping("/open")
	public void open(HttpServletRequest request,HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();

		String pvid = request.getParameter("processVersionId");
		ProcessDefVersion pdv = processDefVersionService.read(new BigDecimal(pvid));
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");

		if(pdv.getFilePath()==null){
			out.write("empty");
			out.flush();
			out.close();
			return;
		}

		try
		{
			String fileAsStr="";
			String dirStrUrl="";
			if(SystemUtils.getPlatForm().equals(SystemUtils.Platform.Windows)){
				dirStrUrl=dirStr;
			}else{
				dirStrUrl=linuxDirStr;
			}
			//利用ftp先下载到本地，然后在读取本地文件
            File file1 = new File(dirStrUrl);
            if (!file1.exists()) {
                file1.mkdirs();
            }

            //FtpUtil.downloadFile(ftpAddress,ftpPort,ftpUsername,ftpPassword,ftpBasepath+linuxDirStr,pdv.getFilePath(),dirStrUrl);
			File file=new File(dirStrUrl+pdv.getFilePath());
			try {
				FileInputStream in=new FileInputStream(file);
//				InputStream in =  FtpUtil.downloadFile(ftpAddress, ftpPort, ftpUsername, ftpPassword, ftpBasepath + linuxDirStr, pdv.getFilePath());
				int size=in.available();
		        byte[] buffer=new byte[size];
		        in.read(buffer);
		        in.close();
		        fileAsStr=new String(buffer,"utf-8");
			} catch (IOException e) {
		        e.printStackTrace();
                *//*out.println("<script>");
                out.println("alert('"+e.getMessage()+"');");
                out.println("</script>");
                out.flush();
                out.close();*//*
		        return;
		    }
			out.write(fileAsStr);
			out.flush();
			out.close();
			// Uses JavaScript to load the XML on the client-side
			//writer.println("window.parent.openFile.setData(decodeURIComponent('"+ encodeURIComponent(xml) + "'), '" + filename + "');");
		}
		catch (Exception e)
		{
            e.printStackTrace();
			error(out, "invalidOrMissingFile");
		}


	}*/

   /* @RequestMapping("/open")
    public void open(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        String pvid = request.getParameter("processVersionId");
        ProcessDefVersion pdv = processDefVersionService.read(new BigDecimal(pvid));
        String s = FtpUtil.ftpFile2resXmlStr(ftpAddress, ftpPort, ftpUsername, ftpPassword, ftpBasepath + linuxDirStr, pdv.getFilePath());
        if ("".equals(s)) {
            out.write("empty");
        } else {
            out.write(s);
        }

        out.flush();
        out.close();
    }*/


    @RequestMapping("/export")
    public void export(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            if (request.getContentLength() < Constants.MAX_REQUEST_SIZE) {
                long t0 = System.currentTimeMillis();

                handleRequest(request, response);

                long mem = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
                long dt = System.currentTimeMillis() - t0;

                System.out.println("export: ip=" + request.getRemoteAddr() + " ref=\"" + request.getHeader("Referer") + "\" length="
                        + request.getContentLength() + " mem=" + mem + " dt=" + dt);
            } else {
                response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);
            }
        } catch (OutOfMemoryError e) {
            e.printStackTrace();
            final Runtime r = Runtime.getRuntime();
            System.out.println("r.freeMemory() = " + r.freeMemory() / 1024.0 / 1024);
            System.out.println("r.totalMemory() = " + r.totalMemory() / 1024.0 / 1024);
            System.out.println("r.maxMemory() = " + r.maxMemory() / 1024.0 / 1024);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } finally {
            response.getOutputStream().flush();
            response.getOutputStream().close();
        }
    }

    protected void handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Parses parameters
        String format = request.getParameter("format");
        String fname = request.getParameter("filename");
        int w = Integer.parseInt(request.getParameter("w"));
        int h = Integer.parseInt(request.getParameter("h"));
        String tmp = request.getParameter("bg");
        String xml = getRequestXml(request);

        Color bg = (tmp != null) ? mxUtils.parseColor(tmp) : null;

        // Checks parameters
        if (w > 0 && h > 0 && w * h < Constants.MAX_AREA && format != null && xml != null && xml.length() > 0) {
            // Allows transparent backgrounds only for PNG
            if (bg == null && !format.equals("png")) {
                bg = Color.WHITE;
            }

            if (fname != null && fname.toLowerCase().endsWith(".xml")) {
                fname = fname.substring(0, fname.length() - 4) + format;
            }

            String url = request.getRequestURL().toString();

            // Writes response
            if (format.equals("pdf")) {
                writePdf(url, fname, w, h, bg, xml, response);
            } else {
                writeImage(url, format, fname, w, h, bg, xml, response);
            }

            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    protected String getRequestXml(HttpServletRequest request) throws IOException, UnsupportedEncodingException {
        String xml = request.getParameter("xml");

        // Decoding is optional (no plain text values allowed)
        if (xml != null && xml.startsWith("%3C")) {
            xml = URLDecoder.decode(xml, "UTF-8");
        }

        return xml;
    }

    protected void writeImage(String url, String format, String fname, int w, int h, Color bg, String xml, HttpServletResponse response)
            throws IOException, SAXException, ParserConfigurationException {
        BufferedImage image = mxUtils.createBufferedImage(w, h, bg);

        if (image != null) {
            Graphics2D g2 = image.createGraphics();
            mxUtils.setAntiAlias(g2, true, true);
            renderXml(xml, createCanvas(url, g2));

            if (fname != null) {
                response.setContentType("application/x-unknown");
                response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + "\"; filename*=UTF-8''" + fname);
            } else if (format != null) {
                response.setContentType("image/" + format.toLowerCase());
            }

            ImageIO.write(image, format, response.getOutputStream());
        }
    }

    protected void writePdf(String url, String fname, int w, int h, Color bg, String xml, HttpServletResponse response)
            throws DocumentException, IOException, SAXException, ParserConfigurationException {
        response.setContentType("application/pdf");

        if (fname != null) {
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fname + "\"; filename*=UTF-8''" + fname);
        }

        // Fixes PDF offset
        w += 1;
        h += 1;

        Document document = new Document(new com.mxpdf.text.Rectangle(w, h));
        PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        mxGraphicsCanvas2D gc = createCanvas(url, writer.getDirectContent().createGraphics(w, h));

        // Fixes PDF offset
        gc.translate(1, 1);

        renderXml(xml, gc);
        gc.getGraphics().dispose();
        document.close();
        writer.flush();
        writer.close();
    }

    /**
     * Renders the XML to the given canvas.
     */
    protected void renderXml(String xml, mxICanvas2D canvas) throws SAXException, ParserConfigurationException, IOException {
        XMLReader reader = parserFactory.newSAXParser().getXMLReader();
        reader.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        reader.setFeature("http://xml.org/sax/features/external-general-entities", false);
        reader.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        reader.setContentHandler(new mxSaxOutputHandler(canvas));
        reader.parse(new InputSource(new StringReader(xml)));
    }

    /**
     * Creates a graphics canvas with an image cache.
     */
    protected mxGraphicsCanvas2D createCanvas(String url, Graphics2D g2) {
        // Caches custom images for the time of the request
        final Hashtable<String, Image> shortCache = new Hashtable<String, Image>();
        final String domain = url.substring(0, url.lastIndexOf("/"));

        mxGraphicsCanvas2D g2c = new mxGraphicsCanvas2D(g2) {
            public Image loadImage(String src) {
                // Uses local image cache by default
                Hashtable<String, Image> cache = shortCache;

                // Uses global image cache for local images
                if (src.startsWith(domain)) {
                    cache = imageCache;
                }

                Image image = cache.get(src);

                if (image == null) {
                    image = super.loadImage(src);

                    if (image != null) {
                        cache.put(src, image);
                    } else {
                        cache.put(src, Constants.EMPTY_IMAGE);
                    }
                } else if (image == Constants.EMPTY_IMAGE) {
                    image = null;
                }

                return image;
            }
        };

        return g2c;
    }

    public static void error(PrintWriter w, String key) {
        w.println("window.parent.openFile.error(window.parent.mxResources.get('"
                + key + "'));");
    }

    public static String encodeURIComponent(String s) {
        String result = null;

        try {
            result = URLEncoder.encode(s, "UTF-8").replaceAll("\\+", "%20")
                    .replaceAll("\\%21", "!").replaceAll("\\%28", "(")
                    .replaceAll("\\%29", ")").replaceAll("\\%7E", "~");
        }

        // This exception should never occur.
        catch (UnsupportedEncodingException e) {
            result = s;
        }

        return result;
    }

    protected static final String ENCODING = "UTF-8";

    protected Map<String, String> parseMultipartRequest(
            HttpServletRequest request) throws IOException {
        Map<String, String> result = new Hashtable<String, String>();
        String contentType = request.getHeader("Content-Type");

        // Checks if the form is of the correct content type
        if (contentType != null
                && contentType.indexOf("multipart/form-data") == 0) {
            // Extracts the boundary from the header
            int boundaryIndex = contentType.indexOf("boundary=");
            String boundary = "--"
                    + contentType.substring(boundaryIndex + 9).trim();

            // Splits the multipart/form-data into its different parts
            Iterator<String> it = splitFormData(
                    readStream(request.getInputStream()), boundary).iterator();

            while (it.hasNext()) {
                parsePart(it.next(), result);
            }
        }

        return result;
    }

    protected void parsePart(String part, Map<String, String> into) {
        String[] lines = part.split("\r\n");

        if (lines.length > 1) {
            // First line contains content-disposition in the following format:
            // form-data; name="upfile"; filename="avatar.jpg"
            String[] tokens = lines[1].split(";");

            // Stores the value of the name attribute for the form-data
            String name = null;

            for (int i = 0; i < tokens.length; i++) {
                String tmp = tokens[i];
                int index = tmp.indexOf("=");

                // Checks if the token contains a key=value pair
                if (index >= 0) {
                    String key = tmp.substring(0, index).trim();
                    String value = tmp.substring(index + 2, tmp.length() - 1);

                    if (key.equals("name")) {
                        name = value;
                    } else {
                        into.put(key, value);
                    }
                }
            }

            // Parses all lines starting from the first empty line
            if (name != null && lines.length > 2) {
                boolean active = false;
                StringBuffer value = new StringBuffer();

                for (int i = 2; i < lines.length; i++) {
                    if (active) {
                        value.append(lines[i]);
                    } else if (!active) {
                        active = lines[i].length() == 0;
                    }
                }

                into.put(name, value.toString());
            }
        }
    }

    protected List<String> splitFormData(String formData, String boundary) {
        List<String> result = new LinkedList<String>();
        int nextBoundary = formData.indexOf(boundary);

        while (nextBoundary >= 0) {
            if (nextBoundary > 0) {
                result.add(formData.substring(0, nextBoundary));
            }

            formData = formData.substring(nextBoundary + boundary.length());
            nextBoundary = formData.indexOf(boundary);
        }

        return result;
    }

    public String readStream(InputStream is) throws IOException {
        if (is != null) {
            StringBuffer buffer = new StringBuffer();
            try {
                Reader in = new BufferedReader(new InputStreamReader(is,
                        ENCODING));
                int ch;

                while ((ch = in.read()) > -1) {
                    buffer.append((char) ch);
                }
            } finally {
                is.close();
            }

            return buffer.toString();
        } else {
            return "";
        }
    }


}
