package com.demo.Controllers;

import java.awt.PageAttributes.MediaType;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.Model.PropertyDetails;
import com.demo.Services.PropertyServices;

@RestController
@CrossOrigin (origins="http://localhost:5173")
public class PropertyController {

	@Autowired
	PropertyServices ps;
	
	@PostMapping("/insertproperty")
	public Map insertproperty(@RequestBody PropertyDetails p) {
		Map r=ps.insertproperty(p);
		Map<String, Object> m=new HashMap<>();
		if(r.containsKey("success")) {
			m.put("success", "Inserted property successfully");
		}
		else {
			m.put("failed", r.get("failed"));
		}
		return m;
	}
	@PostMapping(value = "/insertproperty2", consumes = "multipart/form-data")
	public Map<String, Object> insertProperty2(
	        @RequestParam("image") MultipartFile imageFile, 
	        @RequestParam("type") String type,
	        @RequestParam("location") String location,
	        @RequestParam("ownerName") String ownerName,
	        @RequestParam("ownerEmail") String ownerEmail,
	        @RequestParam("ownerContact") long ownerContact,
	        @RequestParam("agentId") int agentId) {

	    Map<String, Object> response = new HashMap<>();
	    try {
	        byte[] imageBytes = imageFile.getBytes(); 
	        PropertyDetails property = new PropertyDetails();
	        property.setType(type);
	        property.setLocation(location);
	        property.setOwnername(ownerName);
	        property.setOwneremail(ownerEmail);
	        property.setOwnercontact(ownerContact);
	        property.setAgentId(agentId);
	        property.setImage(imageBytes);

	        Map<String, Object> result = ps.insertproperty2(property);

	        if (result.containsKey("success")) {
	            response.put("success", "Inserted property successfully");
	        } else {
	            response.put("failed", result.get("failed"));
	        }
	    } catch (Exception e) {
	        response.put("failed", e.getMessage());
	    }
	    return response;
	}
 




	@GetMapping("/viewproperty")
	public List viewproperty() {
		return ps.viewproperty();
	}
	@GetMapping("/agentproperties/{username}")
	public List agentproperties(@PathVariable String username) {
		return ps.agentproperties(username);
	}
	
	@GetMapping("/getproperty/{pid}")
	public List getproperty(@PathVariable int pid) {
		return ps.getproperty(pid);
	}
	
//	@PostMapping("/updateproperty")
//	 public Map updateproperty(PropertyDetails p) {
//    	Map m=ps.updateproperty(p);
//    	Map<String,Object> m2=new HashMap<>();
//    	if(m.containsKey("success")) {
//    		m2.put("success",m.get("success"));
//    	}
//    	else {
//    		m2.put("failed", m.get("failed"));
//    	}
//    	return m2;file
//    }
	
	@DeleteMapping("/deleteproperty/{id}")
	public Map deleteproperty(@PathVariable int id) {
		Map m=ps.deleteproperty(id);
		Map<String, Object> m2=new HashMap<>();
		if(m.containsKey("success")) {
			m2.put("success", m.get("success"));
		}
		else {
			m2.put("failed", m.get("failed"));
		}
		return m2;
	}
	
	
	@PostMapping("/updateproperty")
	public Map updateproperty(@RequestBody PropertyDetails p) {
		Map r=ps.updateproperty(p);
		Map<String, Object> m=new HashMap<>();
		if(r.containsKey("success")) {
			m.put("success", "Property updated successfully");
		}
		else {
			m.put("failed", r.get("failed"));
		}
		return m;
	}
}
