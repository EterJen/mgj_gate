package com.gwideal.core.basic.ehcache;

public class EhcacheHelper {
//	<diskStore>==========当内存缓存中对象数量超过maxElementsInMemory时,将缓存对象写到磁盘缓存中(需对象实现序列化接口) <diskStore path="">==用来配置磁盘缓存使用的物理路径,Ehcache磁盘缓存使用的文件后缀名是*.data和*.index 
//	name=================缓存名称,cache的唯一标识(ehcache会把这个cache放到HashMap里) 
//	maxElementsOnDisk====磁盘缓存中最多可以存放的元素数量,0表示无穷大 
//	maxElementsInMemory==内存缓存中最多可以存放的元素数量,若放入Cache中的元素超过这个数值,则有以下两种情况 1)若overflowToDisk=true,则会将Cache中多出的元素放入磁盘文件中 2)若overflowToDisk=false,则根据memoryStoreEvictionPolicy策略替换Cache中原有的元素 
//	eternal==============缓存中对象是否永久有效,即是否永驻内存,true时将忽略timeToIdleSeconds和timeToLiveSeconds 
//	timeToIdleSeconds====缓存数据在失效前的允许闲置时间(单位:秒),仅当eternal=false时使用,默认值是0表示可闲置时间无穷大,此为可选属性 即访问这个cache中元素的最大间隔时间,若超过这个时间没有访问此Cache中的某个元素,那么此元素将被从Cache中清除 
//	timeToLiveSeconds====缓存数据在失效前的允许存活时间(单位:秒),仅当eternal=false时使用,默认值是0表示可存活时间无穷大 即Cache中的某元素从创建到清楚的生存时间,也就是说从创建开始计时,当超过这个时间时,此元素将从Cache中清除 
//	overflowToDisk=======内存不足时,是否启用磁盘缓存(即内存中对象数量达到maxElementsInMemory时,Ehcache会将对象写到磁盘中) 会根据标签中path值查找对应的属性值,写入磁盘的文件会放在path文件夹下,文件的名称是cache的名称,后缀名是data 
//	diskPersistent=======是否持久化磁盘缓存,当这个属性的值为true时,系统在初始化时会在磁盘中查找文件名为cache名称,后缀名为index的文件 这个文件中存放了已经持久化在磁盘中的cache的index,找到后会把cache加载到内存 要想把cache真正持久化到磁盘,写程序时注意执行net.sf.ehcache.Cache.put(Element element)后要调用flush()方法 
//	diskExpiryThreadIntervalSeconds==磁盘缓存的清理线程运行间隔,默认是120秒 
//	diskSpoolBufferSizeMB============设置DiskStore（磁盘缓存）的缓存区大小,默认是30MB 
//	memoryStoreEvictionPolicy========内存存储与释放策略,即达到maxElementsInMemory限制时,Ehcache会根据指定策略清理内存 共有三种策略,分别为LRU(最近最少使用)、LFU(最常用的)、FIFO(先进先出) 
	protected static final String UUID = "UUID";
	protected static final int DEFAULT_TIME = 1800;
	protected static final int MOBILE_TIME = 2592000;
	public static String EHCACHE_LOGIN_NAME = "";
}
