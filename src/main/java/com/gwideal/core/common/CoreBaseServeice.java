package com.gwideal.core.common;

import com.gwideal.core.basic.l4.entity.CoreMpsModule;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;


public class CoreBaseServeice<T extends CoreBaseEntity,K,M> {

  /*  public List<T> toTree(List<T> coreMpsModules) {
        List<T> trees = new ArrayList<T>();
        for (T treeNode : coreMpsModules) {
            if (treeNode.getParentid() == null) {
                trees.add(findChildren(treeNode, coreMpsModules));
            }
        }
        return trees;
    }*/
    public List<T> toTree(List<T> tList) {
        Map<BigDecimal, T> tMap = tList.stream().collect(Collectors.toMap(T::getId, a -> a, (k1, k2) -> k1));
/*
        if (tMap.size() != tList.size()) {
            System.out.println("权限列表数据重复");
        }
*/
        for (T lt : tList) {
            BigDecimal parentid = lt.getParentid();
            if (null != parentid) {
                T mt = tMap.get(parentid);
                if (null != mt) {
                    if (null == mt.getNodes()) {
                        mt.setNodes(new ArrayList());
                    }
                    mt.getNodes().add(lt);
                    lt.setFilter(false);
                }
            }
        }
        List<T> collect = tList.stream().filter(s -> s.isFilter()).collect(Collectors.toList());
        return collect;
    }




    public void authTreeFilter(List<T> coreMpsModules) {
        Iterator<T> iterator = coreMpsModules.iterator();
        while (iterator.hasNext()) {
            T next = iterator.next();
            List nodes = next.getNodes();
            if (null != nodes && !nodes.isEmpty()) {
                Iterator iterator1 = nodes.iterator();
                while (iterator1.hasNext()) {
                    Object next1 = iterator1.next();
                    if (next1 instanceof CoreMpsModule) {
                        CoreMpsModule coreMpsModule = (CoreMpsModule) next1;
                        List<CoreMpsModule> nodes1 = coreMpsModule.getNodes();
                        if (null == nodes1 || nodes1.isEmpty()) {
                            iterator1.remove();
                        }
                    }
                }
            }
            if (null == nodes || nodes.isEmpty()) {
                iterator.remove();
            }
        }
    }

    public T findChildren(T treeNode, List<T> treeNodes) {
        for (T it : treeNodes) {
            if (treeNode.getId().equals(it.getParentid())) {
                if (treeNode.getNodes() == null) {
                    treeNode.setNodes(new ArrayList<T>());
                }
                treeNode.getNodes().add(findChildren(it, treeNodes));
            }
        }
        return treeNode;
    }

    public Map<K, M> parseMapForFilterByOptional(Map<K, M> map) {

        return Optional.ofNullable(map).map(
                (v) -> {
                    Map params = v.entrySet().stream()
                            .filter((e) -> checkValue(e.getValue()))
                            .collect(Collectors.toMap(
                                    (e) -> (K) e.getKey(),
                                    (e) -> e.getValue()
                            ));

                    return params;
                }
        ).orElse(null);
    }

    private static boolean checkValue(Object value) {
        if (null == value) {
            return false;
        } else if (value instanceof List) {
            if (((List) value).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    /*分别实现key val 的comapreTo方法即可*/
    public <K extends Comparable<? super K>, M > Map<K, M> sortByKey(Map<K, M> map) {
        Map<K, M> result = new LinkedHashMap<>();

        map.entrySet().stream()
                .sorted(Map.Entry.<K, M>comparingByKey()
                        .reversed()).forEachOrdered(e -> result.put(e.getKey(), e.getValue()));
        return result;
    }

}
