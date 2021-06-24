package com.gwideal.core.jwt;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class JwtTokenUtil implements Serializable {

    /*private static final long serialVersionUID = -3301605591108950415L;
    //清清楚楚地定义在jwt的payload中到底要放些什么信息，由于这些信息是随着token在客户端和服务器端进行来回传递的，所以一定要很清晰地定义，不能浪费也不能少；
    private static final String CLAIM_KEY_USERNAME = "sub";
    private static final String CLAIM_KEY_CREATED = "created";
    private static final String CLAIM_KEY_CORE_USER= "coreUser";
    

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }
    
    public JwtUser getUserInfoFromToken(String token){
    	try {
            final Claims claims = getClaimsFromToken(token);
            CoreUser coreUser = JsonUtils.readByJsonStrAndClass((String)claims.get(CLAIM_KEY_CORE_USER),CoreUser.class);
            return new JwtUser(coreUser.getId(),coreUser.getUsername(),coreUser.getPassword(),coreUser, null, null);
        } catch (Exception e) {
        	e.printStackTrace();
        	return null;
        }
    }

    public Date getCreatedDateFromToken(String token) {
        Date created;
        try {
            final Claims claims = getClaimsFromToken(token);
            created = new Date((Long) claims.get(CLAIM_KEY_CREATED));
        } catch (Exception e) {
            created = null;
        }
        return created;
    }

    public Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiration * 1000);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
        return (lastPasswordReset != null && created.before(lastPasswordReset));
    }

    public String generateToken(UserDetails userDetails) throws JsonProcessingException {
    	JwtUser jwtUser = (JwtUser)userDetails;
        CoreUser coreUser = jwtUser.getCoreUser();
        //coreUser.setDepartment(null);
        //coreUser.setUserPostList(null);
        //coreUser.setUserDepartList(null);
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, jwtUser.getUsername());
        claims.put(CLAIM_KEY_CREATED, new Date());
        claims.put(CLAIM_KEY_CORE_USER, JsonUtils.writeAsFlatJson(coreUser));
        return generateToken(claims);
    }

    String generateToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
        final Date created = getCreatedDateFromToken(token);
        return !isCreatedBeforeLastPasswordReset(created, lastPasswordReset)
                && !isTokenExpired(token);
    }

    public String refreshToken(String token) {
        String refreshedToken;
        try {
            final Claims claims = getClaimsFromToken(token);
            claims.put(CLAIM_KEY_CREATED, new Date());
            refreshedToken = generateToken(claims);
        } catch (Exception e) {
            refreshedToken = null;
        }
        return refreshedToken;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        JwtUser user = (JwtUser) userDetails;
        final String username = getUsernameFromToken(token);
        return (username.equals(user.getUsername())&& !isTokenExpired(token));
    }*/
}

