package com.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.demo.Model.PropertyRoles;

@Service
public class RoleService {
      @Autowired
      JdbcTemplate jj;

	public int addrole(PropertyRoles pr) {
		int result;
		try {
			result=jj.update("insert into propertyroles values(?,?)",pr.getRoleid(),pr.getRolename());
		}
		catch(Exception e){
			result=0;
		}
		return result;
	}
      
      
}
