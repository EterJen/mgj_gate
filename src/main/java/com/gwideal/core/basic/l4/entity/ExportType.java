package com.gwideal.core.basic.l4.entity;


public class ExportType {
	private String exportType;
	private String[] fiendsToInsert;
	private String[] tiltes;
	private String[] colWidth;
	private String exportFileName;

	public ExportType(String exportType, String[] fiendsToInsert, String[] tiltes, String exportFileName,String[] colWidth) {
		this.exportType = exportType;
		this.fiendsToInsert = fiendsToInsert;
		this.tiltes = tiltes;
		this.colWidth = colWidth;
		this.exportFileName = exportFileName;
	}

	public String getExportType() {
		return exportType;
	}

	public void setExportType(String exportType) {
		this.exportType = exportType;
	}

	public String[] getFiendsToInsert() {
		return fiendsToInsert;
	}

	public void setFiendsToInsert(String[] fiendsToInsert) {
		this.fiendsToInsert = fiendsToInsert;
	}

	public String getExportFileName() {
		return exportFileName;
	}

	public void setExportFileName(String exportFileName) {
		this.exportFileName = exportFileName;
	}

	public String[] getTiltes() {
		return tiltes;
	}

	public void setTiltes(String[] tiltes) {
		this.tiltes = tiltes;
	}

	public String[] getColWidth() {
		return colWidth;
	}

	public void setColWidth(String[] colWidth) {
		this.colWidth = colWidth;
	}
}
