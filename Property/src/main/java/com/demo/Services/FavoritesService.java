package com.demo.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.demo.Model.Favorites;

@Service
public class FavoritesService {
 
	@Autowired
	JdbcTemplate j;
	
	public Map insertfavorites(Favorites f) {
		Map<String, Object> m=new HashMap<>();
		try {
			String sql="insert into favorites(propertyid,userid) values(?,?) ";
			int r=j.update(sql,f.getPropertyid(),f.getUserid());
			if(r>0) {
				m.put("success", "Inserted Successfully");
			}else {
				m.put("failed","failed");
			}
		}
		catch(Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public Map deletefavorites(Favorites f) {
		Map<String, Object> m=new HashMap<>();
		try {
			String sql="delete from favorites where propertyid=? and userid=?";
			int r=j.update(sql,f.getPropertyid(),f.getUserid());
			if(r>0) {
				m.put("success", "deleted Successfully");
			}else {
				m.put("failed","failed");
			}
		}
		catch(Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public Map veiwfavorites(int userid) {
		Map<String, Object> m=new HashMap<>();
		try {
			String sql="select * from propertydetails where id in (select propertyid from favorites where userid=?)";
			List<Map<String, Object>> r=j.queryForList(sql, new Object[]{userid});
			if(r.size()>0) {
				m.put("success", r);
			}else {
				m.put("failed","failed");
			}
		}
		catch(Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

}
