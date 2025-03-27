package com.demo.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.Model.PropertyRoles;
import com.demo.Services.RoleService;
@RestController
public class RolesController {
     @Autowired
     RoleService rs;
     
     @PostMapping("/addrole")
     public Map addrole(@RequestBody PropertyRoles pr) {
    	 int r=rs.addrole(pr);
    	 Map<String,String> m=new HashMap<>();
    	 if(r>0) {
    		 m.put("success", "Roles added successfully");
    	 }
    	 else {
    		 m.put("failed", "Roles are not added");
    	 }
    	 return m;
     }
}
