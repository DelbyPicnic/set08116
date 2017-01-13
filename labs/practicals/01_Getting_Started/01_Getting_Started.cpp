// The main header for the graphics framework
#include <graphics_framework.h>

// The namespaces we are using
using namespace std;
using namespace graphics_framework;
using namespace glm;

// Initial one-time startup code goes here
bool load_content() 
{ 
	geometry geo;

	vector<vec3> positions
	{
		vec3(0.0f, 1.0f, 0.0f),
		vec3(-1.0f, -1.0f, 0.0f),
		vec3(1.0f, -1.0f, 0.0f)
	};

	geo.add_buffer(positions, BUFFER_INDEXES::POSITION_BUFFER);
	return true; 
}

// Called every frame, do game logic here
bool update(float delta_time) {
  cout << "FPS: " << 1.0f / delta_time << endl;
  return true;
}

// Called every frame, do rendering here
bool render() 
{ return true; }

void main() {
  // Create application
  app application;
  // Set load content, update and render methods
  application.set_load_content(load_content);
  application.set_update(update);
  application.set_render(render);
  // Run application
  application.run();
}