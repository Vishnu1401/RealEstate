package com.demo.Services;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.demo.Model.PropertyUser;

@Service
public class RegisterService {

	   @Autowired
	    JdbcTemplate j;
	  public int register(PropertyUser p) {
		try {
			String sql="insert into propertyusers(firstname,lastname,username, email,phonenumber,address,roleid)"
					+ "values(?,?,?,?,?,?,?)";
			int r1= j.update(sql,p.getFirstname(),p.getLastname(),p.getUsername(),
					p.getEmail(),p.getPhonenumber(),p.getAddress(),p.getRoleid());
			p.setUserid(getUserid(p.getUsername())); 
			int r2=login(p);
			if(r1>0 && r2>0)
				return r1;
			else
				return -1;
		}
		catch(Exception e) {
			return -1;
		}
			
	  }
	  
	  public Integer getUserid(String username) {
		    String sql = "SELECT userid FROM propertyusers WHERE username = ?";
            try {
    		    return j.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> rs.getInt("userid"));
            }
            catch(Exception e) {
            	return -1;
            }
		}
	  @SuppressWarnings("deprecation")
	public Integer getRoleId(String username) {
		    String sql = "SELECT roleid FROM propertyusers WHERE username = ?";
          try {
  		    return j.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> rs.getInt("roleid"));
          }
          catch(Exception e) {
          	return -1;
          }
		}

      public int login(PropertyUser p) {
    	  String sql="insert into propertyuserlogin values(?,?,?)";
    	  try {
    		  return j.update(sql,p.getUserid(),p.getUsername(),p.getPassword());
    	  }
    	  catch(Exception e) {
    		  return -1;
    	  }
      }

	public Map loginverification(PropertyUser p) {
		String sql="select password from propertyuserlogin where username=?";
		Map<String, String> m=new HashMap<>();
		try { 
			String s=j.queryForObject(sql, new Object[]{p.getUsername()},String.class);
			m.put("success", s);
		}
		catch(Exception e) {
			m.put("failed","No user exist");
		}
		return m;
	}
//
//	public Map getRole(int userid) {
//		Map<String, Object> m=new HashMap<>();
//	}
}
