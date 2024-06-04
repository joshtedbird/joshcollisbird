#define LAYERS 6.0

uniform float iTime;
uniform vec2 iResolution;
uniform float u_scroll;
varying vec2 vUv;

float hash21( vec2 id ){
   id = fract( id * vec2( 123.34 , 456.21 ) );
   id += dot( id , id + 45.321);
   return fract( id.x * id.y );
}
 
float star( vec2 uv , float flare , float rand ){
    // Simulating a light like shape
    float d = length(uv);
    float starLight = 0.005/d;
 
    starLight *= smoothstep( 0.02 , 0.004 , d );
    return max( starLight , 0.0 );
}

vec4 starLayer( vec2 uv , float layerSeed ){
    vec2 id = floor(uv);
    vec2 gv = fract(uv);
    
    vec4 col = vec4( 0 );
    
    for( int y=-1; y<=1; y++ ) {
        for( int x=-1; x<=1; x++ ) {
            vec2 offset = vec2(x , y);
            vec2 thisId = offset + id;
            
            float starRand = hash21( thisId + layerSeed );
            float size = fract(starRand * 5.32 );
            vec2 starPos = gv - offset - vec2( sin(starRand * 12.3423) * 0.5 + 0.5 , fract( starRand * 90.123 ) ) + 0.5;
            
            float thisStar = star( starPos , smoothstep( .9 , 1.0, 1.0 ) , starRand  );
            
            vec4 color = vec4(1.0);
      
            
            col += thisStar * size * color;
        }
    }
    
    return col;
}
 
void main() {
    vec2 fragCoord = vUv * iResolution;
{
    // Center UV coordinate
    vec2 uv = ( fragCoord - 0.5 * iResolution.xy )/iResolution.y;
    float t = iTime * 0.5;
    
    float distFade = 1.0;
    vec4 col = vec4( 0 );
    for( float x = 0.0; x<1.0; x += 1.0/LAYERS){
        float depth = fract( x );
        float fade = depth;
        float scale = mix( 10.0 , 0.5 , depth );
        float layerRand = hash21( vec2(scale , depth) ) ;
        // Edit the vec2( sin .... ) param to change how the movement is done.
        // Currently set up to rotate in a circle but this could be tweaked to
        // go in any direction by adding the appropriate vector. 
        col += starLayer( uv * scale + vec2(0, u_scroll * -2.0) , layerRand ) * fade;
    }
    
    gl_FragColor = col;
}}