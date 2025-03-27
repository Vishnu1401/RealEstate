package com.demo.Model;

import org.springframework.stereotype.Component;

@Component
public class Favorites {
    private int id, propertyid, userid;

	public int getId() {
		return id;
	}

	public int getPropertyid() {
		return propertyid;
	}

	public int getUserid() {
		return userid;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPropertyid(int propertyid) {
		this.propertyid = propertyid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}
    
}
