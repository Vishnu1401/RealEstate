package com.demo.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.Model.PropertyDetails;

@Service
public class PropertyServices {

	@Autowired
	JdbcTemplate j;

	public Map insertproperty(PropertyDetails p) {
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "insert into propertydetails(type, location,ownerName, ownerEmail, ownerContact, agentId)"
					+ " values(?,?,?,?,?,?) ";
			int r = j.update(sql, p.getType(), p.getLocation(), p.getOwnername(), p.getOwneremail(),
					p.getOwnercontact(), p.getAgentId());
			m.put("success", r);
		} catch (Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public Map updateproperty(PropertyDetails p) {
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "update propertydetails set type=?,location=?,ownerName=?, ownerEmail=?, ownerContact=? where id=?";
			int r = j.update(sql, p.getType(), p.getLocation(), p.getOwnername(), p.getOwneremail(),
					p.getOwnercontact(), p.getId());
			m.put("success", r);
		} catch (Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public Map<String, Object> insertproperty2(PropertyDetails p) {
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "INSERT INTO propertydetails (type, location, ownerName, ownerEmail, ownerContact, agentId, image) "
					+ "VALUES (?, ?, ?, ?, ?, ?, ?)";
			int result = j.update(sql, p.getType(), p.getLocation(), p.getOwnername(), p.getOwneremail(),
					p.getOwnercontact(), p.getAgentId(), p.getImage());

			m.put("success", result);
		} catch (Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public List viewproperty() {
		List<Map<String, Object>> l = new ArrayList<>();
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "select * from propertydetails";
			return j.queryForList(sql);

		} catch (Exception e) {
			m.put("failed", e.getMessage());
			l.add(m);
			return l;
		}}
	

	public List agentproperties(String username) {
		List<Map<String, Object>> l = new ArrayList<>();
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "select * from propertydetails where agentId=(select userid from propertyusers where username=?)";
			return j.queryForList(sql, new Object[] { username });

		} catch (Exception e) {
			m.put("failed", e.getMessage());
			l.add(m);
			return l;
		}
	}

	public Map deleteproperty(int id) {
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "delete from propertydetails where id=?";
			int r = j.update(sql, id);
			if (r > 0) {
				m.put("success", r);
			} else {
				m.put("failed", "failed");
			}
		} catch (Exception e) {
			m.put("failed", e.getMessage());
		}
		return m;
	}

	public List getproperty(int pid) {
		List<Map<String, Object>> l = new ArrayList<>();
		Map<String, Object> m = new HashMap<>();
		try {
			String sql = "select * from propertydetails where id=?";
			return j.queryForList(sql, new Object[] { pid });

		} catch (Exception e) {
			m.put("failed", e.getMessage());
			l.add(m);
			return l;
		}
	}

}
