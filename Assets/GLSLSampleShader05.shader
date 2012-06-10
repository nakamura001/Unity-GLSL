Shader "GLSL Sample05"  { // defines the name of the shader 
   SubShader { // Unity chooses the subshader that fits the GPU best
      Tags {"Queue" = "Transparent"}
      
      Pass { // some shaders require multiple passes
         Cull Front // first render the back faces
         ZWrite Off // don't write to depth buffer 
            // in order not to occlude other objects
         Blend SrcAlpha OneMinusSrcAlpha 
            // blend based on the fragment's alpha value
         
         GLSLPROGRAM // here begins the part in Unity's GLSL
 
         #ifdef VERTEX // here begins the vertex shader
 
         attribute vec2 a_texCoord;
         varying vec2 v_texCoord;
         void main() // all vertex shaders define a main() function
         {
            gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
            v_texCoord = a_texCoord;
               // this line transforms the predefined attribute 
               // gl_Vertex of type vec4 with the predefined
               // uniform gl_ModelViewProjectionMatrix of type mat4
               // and stores the result in the predefined output 
               // variable gl_Position of type vec4.
         }
 
         #endif // here ends the definition of the vertex shader
 
 
         #ifdef FRAGMENT // here begins the fragment shader
 
         varying vec2 v_texCoord;
         void main() // all fragment shaders define a main() function
         {
            float v = v_texCoord.x;
            gl_FragColor = vec4(v,v,v,1);
               // this fragment shader just sets the output color 
               // to opaque red (red = 1.0, green = 0.0, blue = 0.0, 
               // alpha = 1.0)
         }
 
         #endif // here ends the definition of the fragment shader
 
         ENDGLSL // here ends the part in GLSL 
      }
   }
}