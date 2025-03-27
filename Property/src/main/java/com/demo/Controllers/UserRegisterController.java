package com.demo.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.Model.PropertyUser;
import com.demo.Services.RegisterService;

@RestController
@CrossOrigin (origins="http://localhost:5173")
public class UserRegisterController {
    
    @Autowired
    RegisterService rs;
    
    @PostMapping("/register")
    public Map register(@RequestBody PropertyUser p) {
    	int r=rs.register(p);
    	Map<String,String> m=new HashMap<>();
    	if(r>0) {
    		m.put("success", "Registration Successful");
    	}
    	else {
    		m.put("failed", "Registration Failed, Try Again");
    	}
    	return m;
    }
    
    @PostMapping("/loginverification")
    public Map loginverification(@RequestBody PropertyUser p) {
    	Map m2=rs.loginverification(p);
    	Map<String,String> m=new HashMap<>();
    	if(m2.containsKey("success")) {
    		System.out.println(m2.get("success"));
    		if(p.getPassword().equals(m2.get("success"))) {
    			m.put("success", "Login Successful");
    		}
    		else {
    			m.put("failed", "password incorrect");
    		}
    	}
    	else {
    		m.put("failed", "Username not exist");
    	}
    	return m;
    }
    
    @GetMapping("/getuserid/{username}")
    public Map getuserid(@PathVariable String username) {
    	int r=rs.getUserid(username);
    	Map<String,Object> m=new HashMap<>();
    	if(r>0) {
    		m.put("success",r);
    	}
    	else {
    		m.put("failed", "User not exist");
    	}
    	return m;
    }
    @GetMapping("/getroleid/{username}")
    public Map getRoleid(@PathVariable String username) {
    	int r=rs.getRoleId(username);
    	Map<String,Object> m=new HashMap<>();
    	if(r>0) {
    		m.put("success",r);
    	}
    	else {
    		m.put("failed", "User not exist");
    	}
    	return m;
    }
    
//    @GetMapping("/getrole/{userid}")
//    public Map getRole(@PathVariable int userid) {
//    	Map m2=rs.getRole(userid);
//    	Map<String,Object> m=new HashMap<>();
//    	if(m2.containsKey("success")) {
//    		m.put("success",m2.get("success"));
//    	}
//    	else {
//    		m.put("failed", m2.get("failed"));
//    	}
//    	return m;
//    }
}
