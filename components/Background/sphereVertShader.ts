/* eslint-disable import/no-anonymous-default-export */
//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

export default `
uniform float time;
varying vec3 vNormal;
varying vec2 vUv;

float turbulence(vec3 p) {
  // Retourne une valeur simple pour test (ex: sin basé sur position)
  return 0.5 + 0.5 * sin(p.x * 10.0 + time);
}

void main() {
  #include <beginnormal_vertex>
  #include <defaultnormal_vertex>
  #include <begin_vertex>
  float noise = 0.5 + 0.5 * sin(position.x * 10.0 + time);
  float dispFactor = 0.1;
  transformed += normal * noise * dispFactor;
  #include <project_vertex>

  vNormal = normalize(transformedNormal);
  vUv = uv;

  float noise = turbulence(position + normal + time);
  float dispFactor = 0.1; // petit facteur pour limiter le déplacement

  vec3 displacedPosition = position + normal * noise * dispFactor;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}

`;
