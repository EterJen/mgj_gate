package com.gwideal.core.jwt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gwideal.core.cms.l4.entity.Administrator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Collection;

public class JwtUser implements UserDetails {
	
	private static final long serialVersionUID = 234523452345L;
	
	private BigDecimal id;
    private String name;
    private String password;
    private Administrator coreUser;
    private  String status;
    private  String info;
	public JwtUser() {
	}

	public JwtUser(BigDecimal id, String name, String password, Administrator coreUser,String status,String info) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.coreUser = coreUser;
        this.status = status;
        this.info = info;
    }

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @JsonIgnore
    public BigDecimal getId() {
        return id;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /*用户超时锁*/
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public String getStatus() {
        return status;
    }

    public String getInfo() {
        return info;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

	public Administrator getCoreUser() {
		return coreUser;
	}
    
    
    
}
