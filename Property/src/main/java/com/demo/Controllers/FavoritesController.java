package com.demo.Controllers;

import java.util.HashMap;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.Model.Favorites;
import com.demo.Services.FavoritesService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class FavoritesController {

	@Autowired
	FavoritesService fs;
	
	@Autowired
	Favorites f;
	
	@PostMapping("/insertfavorites")
	public Map insertfavorites(@RequestBody Favorites f) {
		Map m=fs.insertfavorites(f);
		Map<String,Object> m2=new HashMap<>();
		if(m.containsKey("success")) {
			m2.put("success", m.get("success"));
		}
		else {
			m2.put("failed", m.get("failed"));
		}
		return m2;
	}
	
	@DeleteMapping("/deletefavorites/{userid}/{propertyid}")
	public Map deletefavorites(@PathVariable int userid, @PathVariable int propertyid) {
		f.setUserid(userid);
		f.setPropertyid(propertyid);
		Map m=fs.deletefavorites(f);
		Map<String,Object> m2=new HashMap<>();
		if(m.containsKey("success")) {
			m2.put("success", m.get("success"));
		}
		else {
			m2.put("failed", m.get("failed"));
		}
		return m2;
	}
	
	@GetMapping("/viewfavorites/{userid}")
	public Map viewfavorites(@PathVariable int userid) {
		Map m=fs.veiwfavorites(userid);
		Map<String,Object> m2=new HashMap<>();
		if(m.containsKey("success")) {
			m2.put("success", m.get("success"));
		}
		else {
			m2.put("failed", m.get("failed"));
		}
		return m2;
	}
}
