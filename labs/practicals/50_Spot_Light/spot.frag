#version 440

// Spot light data
struct spot_light {
  vec4 light_colour;
  vec3 position;
  vec3 direction;
  float constant;
  float linear;
  float quadratic;
  float power;
};

// Material data
struct material {
  vec4 emissive;
  vec4 diffuse_reflection;
  vec4 specular_reflection;
  float shininess;
};

// Spot light being used in the scene
uniform spot_light spot;
// Material of the object being rendered
uniform material mat;
// Position of the eye (camera)
uniform vec3 eye_pos;
// Texture to sample from
uniform sampler2D tex;

// Incoming position
layout(location = 0) in vec3 vertex_position;
// Incoming normal
layout(location = 1) in vec3 transformed_normal;
// Incoming texture coordinate
layout(location = 2) in vec2 tex_coord;
// Outgoing colour
layout(location = 0) out vec4 colour;

void main() {
	// *********************************
	// Calculate direction to the light
	vec3 light_dir = normalize(spot.position - vertex_position);
	// Calculate distance to light
	float d = distance(spot.position, vertex_position);
	// Calculate attenuation value
	float atten = (1/(spot.constant + (spot.linear * d) + (spot.quadratic * (d * d))));
	// Calculate spot light intensity
	float intensity = pow(max(dot(spot.direction, light_dir), 0.0), spot.power); //Possibly multiply spot.direction by -1
	// Calculate light colour
	vec4 light_colour = spot.light_colour * (intensity/atten);
	// Calculate view direction
	vec3 view_dir = normalize(eye_pos - vertex_position);
	// Now use standard phong shading but using calculated light colour and direction
	// - note no ambient
	vec4 diffuse = max(dot(transformed_normal, light_dir), 0.0) * (mat.diffuse_reflection * light_colour);
	// Calculate half vector
	vec3 H = normalize(view_dir + light_dir);
	// Calculate specular component
	vec4 specular = (pow(max(dot(H, transformed_normal), 0.0), mat.shininess)) * mat.specular_reflection * light_colour;
	// Sample texture
	vec4 samp_tex = texture(tex, tex_coord);
	// Calculate primary colour component
	vec4 primary = mat.emissive + diffuse;
	// Calculate final colour - remember alpha
	colour = primary * samp_tex + specular;
	colour.a = 1.0;
  // *********************************
}