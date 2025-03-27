package com.demo.Model;

public class PropertyDetails {
    private int id, agentId;
    private String type,location, ownername,owneremail;
    private long ownercontact;
    private byte[] image; // New field for video storage

    // Getters and Setters
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] video) {
        this.image = video;
    }
	public int getId() {
		return id;
	}
	public int getAgentId() {
		return agentId;
	}
	public String getType() {
		return type;
	}
	public String getLocation() {
		return location;
	}
	public String getOwnername() {
		return ownername;
	}
	public String getOwneremail() {
		return owneremail;
	}
	public long getOwnercontact() {
		return ownercontact;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public void setOwnername(String ownername) {
		this.ownername = ownername;
	}
	public void setOwneremail(String owneremail) {
		this.owneremail = owneremail;
	}
	public void setOwnercontact(long ownercontact) {
		this.ownercontact = ownercontact;
	}
    
}