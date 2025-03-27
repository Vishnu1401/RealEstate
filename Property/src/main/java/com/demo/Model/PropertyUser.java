package com.demo.Model;

public class PropertyUser {
	
	private int userid ,roleid;
	private String firstname,lastname,username,email,address,password;
	private long phonenumber;
	private byte[] image;
	public int getUserid() {
		return userid;
	}
	public int getRoleid() {
		return roleid;
	}
	public String getFirstname() {
		return firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}
	public String getAddress() {
		return address;
	}
	public String getPassword() {
		return password;
	}
	public long getPhonenumber() {
		return phonenumber;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setPhonenumber(long phonenumber) {
		this.phonenumber = phonenumber;
	}
	
	
}   
 
