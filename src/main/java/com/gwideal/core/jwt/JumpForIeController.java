package com.gwideal.core.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;


@Controller
public class JumpForIeController {

    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    /*@RequestMapping(value = "${jwt.route.jumpForIe.path}",method = RequestMethod.GET)
    public String createAuthenticationToken(String authToken,HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, ServletException, IOException{
          String username = jwtTokenUtil.getUsernameFromToken(authToken);
          if (username != null ) {
          	CoreUser coreUser = new CoreUser();
          	coreUser.setUsername(username);
          	//从token中获取用户的信息
          	JwtUser jwtUser = jwtTokenUtil.getUserInfoFromToken(authToken);

              if (jwtTokenUtil.validateToken(authToken, jwtUser)) {
            	  request.setAttribute("token", authToken);
              }
          }
          
        return "redirect:/hello.html";
    }*/

  
}
