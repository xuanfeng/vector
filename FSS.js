function FSS(container, output){
	FSS = {
		FRONT: 0,
		BACK: 1,
		DOUBLE: 2,
		SVGNS: "http://www.w3.org/2000/svg"
	};
	FSS.Array = "function" === typeof Float32Array ? Float32Array: Array;
	FSS.Utils = {
		isNumber: function(b) {
			return ! isNaN(parseFloat(b)) && isFinite(b)
		}
	};


	(function() {
		for (var b = 0, d = ["ms", "moz", "webkit", "o"], h = 0; h < d.length && !window.requestAnimationFrame; ++h) window.requestAnimationFrame = window[d[h] + "RequestAnimationFrame"],
		window.cancelAnimationFrame = window[d[h] + "CancelAnimationFrame"] || window[d[h] + "CancelRequestAnimationFrame"];
		window.requestAnimationFrame || (window.requestAnimationFrame = function(d, h) {
			var n = (new Date).getTime(),
			s = Math.max(0, 16 - (n - b)),
			k = window.setTimeout(function() {
				d(n + s)
			},
			s);
			b = n + s;
			return k
		});
		window.cancelAnimationFrame || (window.cancelAnimationFrame = function(b) {
			clearTimeout(b)
		})
	})();
	Math.PIM2 = 2 * Math.PI;
	Math.PID2 = Math.PI / 2;
	Math.randomInRange = function(b, d) {
		return b + (d - b) * Math.random()
	};
	Math.clamp = function(b, d, h) {
		b = Math.max(b, d);
		return b = Math.min(b, h)
	};
	FSS.Vector3 = {
		create: function(b, d, h) {
			var g = new FSS.Array(3);
			this.set(g, b, d, h);
			return g
		},
		clone: function(b) {
			var d = this.create();
			this.copy(d, b);
			return d
		},
		set: function(b, d, h, g) {
			b[0] = d || 0;
			b[1] = h || 0;
			b[2] = g || 0;
			return this
		},
		setX: function(b, d) {
			b[0] = d || 0;
			return this
		},
		setY: function(b, d) {
			b[1] = d || 0;
			return this
		},
		setZ: function(b, d) {
			b[2] = d || 0;
			return this
		},
		copy: function(b, d) {
			b[0] = d[0];
			b[1] = d[1];
			b[2] = d[2];
			return this
		},
		add: function(b, d) {
			b[0] += d[0];
			b[1] += d[1];
			b[2] += d[2];
			return this
		},
		addVectors: function(b, d, h) {
			b[0] = d[0] +
			h[0];
			b[1] = d[1] + h[1];
			b[2] = d[2] + h[2];
			return this
		},
		addScalar: function(b, d) {
			b[0] += d;
			b[1] += d;
			b[2] += d;
			return this
		},
		subtract: function(b, d) {
			b[0] -= d[0];
			b[1] -= d[1];
			b[2] -= d[2];
			return this
		},
		subtractVectors: function(b, d, h) {
			b[0] = d[0] - h[0];
			b[1] = d[1] - h[1];
			b[2] = d[2] - h[2];
			return this
		},
		subtractScalar: function(b, d) {
			b[0] -= d;
			b[1] -= d;
			b[2] -= d;
			return this
		},
		multiply: function(b, d) {
			b[0] *= d[0];
			b[1] *= d[1];
			b[2] *= d[2];
			return this
		},
		multiplyVectors: function(b, d, h) {
			b[0] = d[0] * h[0];
			b[1] = d[1] * h[1];
			b[2] = d[2] * h[2];
			return this
		},
		multiplyScalar: function(b, d) {
			b[0] *= d;
			b[1] *= d;
			b[2] *= d;
			return this
		},
		divide: function(b, d) {
			b[0] /= d[0];
			b[1] /= d[1];
			b[2] /= d[2];
			return this
		},
		divideVectors: function(b, d, h) {
			b[0] = d[0] / h[0];
			b[1] = d[1] / h[1];
			b[2] = d[2] / h[2];
			return this
		},
		divideScalar: function(b, d) {
			0 !== d ? (b[0] /= d, b[1] /= d, b[2] /= d) : (b[0] = 0, b[1] = 0, b[2] = 0);
			return this
		},
		cross: function(b, d) {
			var h = b[0],
			g = b[1],
			l = b[2];
			b[0] = g * d[2] - l * d[1];
			b[1] = l * d[0] - h * d[2];
			b[2] = h * d[1] - g * d[0];
			return this
		},
		crossVectors: function(b, d, h) {
			b[0] = d[1] * h[2] - d[2] * h[1];
			b[1] = d[2] * h[0] - d[0] * h[2];
			b[2] = d[0] * h[1] - d[1] * h[0];
			return this
		},
		min: function(b, d) {
			b[0] < d && (b[0] = d);
			b[1] < d && (b[1] = d);
			b[2] < d && (b[2] = d);
			return this
		},
		max: function(b, d) {
			b[0] > d && (b[0] = d);
			b[1] > d && (b[1] = d);
			b[2] > d && (b[2] = d);
			return this
		},
		clamp: function(b, d, h) {
			this.min(b, d);
			this.max(b, h);
			return this
		},
		limit: function(b, d, h) {
			var g = this.length(b);
			null !== d && g < d ? this.setLength(b, d) : null !== h && g > h && this.setLength(b, h);
			return this
		},
		dot: function(b, d) {
			return b[0] * d[0] + b[1] * d[1] + b[2] * d[2]
		},
		normalise: function(b) {
			return this.divideScalar(b, this.length(b))
		},
		negate: function(b) {
			return this.multiplyScalar(b, -1)
		},
		distanceSquared: function(b, d) {
			var h = b[0] - d[0],
			g = b[1] - d[1],
			l = b[2] - d[2];
			return h * h + g * g + l * l
		},
		distance: function(b, d) {
			return Math.sqrt(this.distanceSquared(b, d))
		},
		lengthSquared: function(b) {
			return b[0] * b[0] + b[1] * b[1] + b[2] * b[2]
		},
		length: function(b) {
			return Math.sqrt(this.lengthSquared(b))
		},
		setLength: function(b, d) {
			var h = this.length(b);
			0 !== h && d !== h && this.multiplyScalar(b, d / h);
			return this
		}
	};
	FSS.Vector4 = {
		create: function(b, d, h, g) {
			g = new FSS.Array(4);
			this.set(g, b, d, h);
			return g
		},
		set: function(b, d, h, g, l) {
			b[0] = d || 0;
			b[1] = h || 0;
			b[2] = g || 0;
			b[3] = l || 0;
			return this
		},
		setX: function(b, d) {
			b[0] = d || 0;
			return this
		},
		setY: function(b, d) {
			b[1] = d || 0;
			return this
		},
		setZ: function(b, d) {
			b[2] = d || 0;
			return this
		},
		setW: function(b, d) {
			b[3] = d || 0;
			return this
		},
		add: function(b, d) {
			b[0] += d[0];
			b[1] += d[1];
			b[2] += d[2];
			b[3] += d[3];
			return this
		},
		multiplyVectors: function(b, d, h) {
			b[0] = d[0] * h[0];
			b[1] = d[1] * h[1];
			b[2] = d[2] * h[2];
			b[3] = d[3] * h[3];
			return this
		},
		multiplyScalar: function(b, d) {
			b[0] *= d;
			b[1] *= d;
			b[2] *= d;
			b[3] *= d;
			return this
		},
		min: function(b, d) {
			b[0] < d && (b[0] = d);
			b[1] < d && (b[1] = d);
			b[2] < d && (b[2] = d);
			b[3] < d && (b[3] = d);
			return this
		},
		max: function(b, d) {
			b[0] > d && (b[0] = d);
			b[1] > d && (b[1] = d);
			b[2] > d && (b[2] = d);
			b[3] > d && (b[3] = d);
			return this
		},
		clamp: function(b, d, h) {
			this.min(b, d);
			this.max(b, h);
			return this
		}
	};
	FSS.Color = function(b, d) {
		this.rgba = FSS.Vector4.create();
		this.hex = b || "#000000";
		this.opacity = FSS.Utils.isNumber(d) ? d: 1;
		this.set(this.hex, this.opacity)
	};
	FSS.Color.prototype = {
		set: function(b, d) {
			b = b.replace("#", "");
			var h = b.length / 3;
			this.rgba[0] = parseInt(b.substring(0 * h, 1 * h), 16) / 255;
			this.rgba[1] = parseInt(b.substring(1 * h, 2 * h), 16) / 255;
			this.rgba[2] = parseInt(b.substring(2 * h, 3 * h), 16) / 255;
			this.rgba[3] = FSS.Utils.isNumber(d) ? d: this.rgba[3];
			return this
		},
		hexify: function(b) {
			b = Math.ceil(255 * b).toString(16);
			1 === b.length && (b = "0" + b);
			return b
		},
		format: function() {
			var b = this.hexify(this.rgba[0]),
			d = this.hexify(this.rgba[1]),
			h = this.hexify(this.rgba[2]);
			return this.hex = "#" +
			b + d + h
		}
	};
	FSS.Object = function() {
		this.position = FSS.Vector3.create()
	};
	FSS.Object.prototype = {
		setPosition: function(b, d, h) {
			FSS.Vector3.set(this.position, b, d, h);
			return this
		}
	};
	FSS.Light = function(b, d) {
		FSS.Object.call(this);
		this.ambient = new FSS.Color(b || "#FFFFFF");
		this.diffuse = new FSS.Color(d || "#FFFFFF");
		this.ray = FSS.Vector3.create()
	};
	FSS.Light.prototype = Object.create(FSS.Object.prototype);
	FSS.Vertex = function(b, d, h) {
		this.position = FSS.Vector3.create(b, d, h)
	};
	FSS.Vertex.prototype = {
		setPosition: function(b, d, h) {
			FSS.Vector3.set(this.position, b, d, h);
			return this
		}
	};
	FSS.Triangle = function(b, d, h) {
		this.a = b || new FSS.Vertex;
		this.b = d || new FSS.Vertex;
		this.c = h || new FSS.Vertex;
		this.vertices = [this.a, this.b, this.c];
		this.u = FSS.Vector3.create();
		this.v = FSS.Vector3.create();
		this.centroid = FSS.Vector3.create();
		this.normal = FSS.Vector3.create();
		this.color = new FSS.Color;
		this.polygon = document.createElementNS(FSS.SVGNS, "polygon");
		this.polygon.setAttributeNS(null, "stroke-linejoin", "round");
		this.polygon.setAttributeNS(null, "stroke-miterlimit", "1");
		this.polygon.setAttributeNS(null, "stroke-width", "1");
		this.computeCentroid();
		this.computeNormal()
	};
	FSS.Triangle.prototype = {
		computeCentroid: function() {
			this.centroid[0] = this.a.position[0] + this.b.position[0] + this.c.position[0];
			this.centroid[1] = this.a.position[1] + this.b.position[1] + this.c.position[1];
			this.centroid[2] = this.a.position[2] + this.b.position[2] + this.c.position[2];
			FSS.Vector3.divideScalar(this.centroid, 3);
			return this
		},
		computeNormal: function() {
			FSS.Vector3.subtractVectors(this.u, this.b.position, this.a.position);
			FSS.Vector3.subtractVectors(this.v, this.c.position, this.a.position);
			FSS.Vector3.crossVectors(this.normal, this.u, this.v);
			FSS.Vector3.normalise(this.normal);
			return this
		}
	};
	FSS.Geometry = function() {
		this.vertices = [];
		this.triangles = [];
		this.dirty = !1
	};
	FSS.Geometry.prototype = {
		update: function() {
			if (this.dirty) {
				var b,
				d;
				for (b = this.triangles.length - 1; 0 <= b; b--) d = this.triangles[b],
				d.computeCentroid(),
				d.computeNormal();
				this.dirty = !1
			}
			return this
		}
	};
	FSS.Plane = function(b, d, h, g) {
		FSS.Geometry.call(this);
		this.width = b || 100;
		this.height = d || 100;
		this.segments = h || 4;
		this.slices = g || 4;
		this.segmentWidth = this.width / this.segments;
		this.sliceHeight = this.height / this.slices;
		var l,
		n,
		s;
		h = [];
		l = -0.5 * this.width;
		n = 0.5 * this.height;
		for (b = 0; b <= this.segments; b++) for (h.push([]), d = 0; d <= this.slices; d++) g = new FSS.Vertex(l + b * this.segmentWidth, n - d * this.sliceHeight),
		h[b].push(g),
		this.vertices.push(g);
		for (b = 0; b < this.segments; b++) for (d = 0; d < this.slices; d++) g = h[b + 0][d + 0],
		l = h[b + 0][d +
		1],
		n = h[b + 1][d + 0],
		s = h[b + 1][d + 1],
		t0 = new FSS.Triangle(g, l, n),
		t1 = new FSS.Triangle(n, l, s),
		this.triangles.push(t0, t1)
	};
	FSS.Plane.prototype = Object.create(FSS.Geometry.prototype);
	FSS.Material = function(b, d) {
		this.ambient = new FSS.Color(b || "#444444");
		this.diffuse = new FSS.Color(d || "#FFFFFF");
		this.slave = new FSS.Color
	};
	FSS.Mesh = function(b, d) {
		FSS.Object.call(this);
		this.geometry = b || new FSS.Geometry;
		this.material = d || new FSS.Material;
		this.side = FSS.FRONT;
		this.visible = !0
	};
	FSS.Mesh.prototype = Object.create(FSS.Object.prototype);
	FSS.Mesh.prototype.update = function(b, d) {
		var h,
		g,
		l,
		n,
		s;
		this.geometry.update();
		if (d) for (h = this.geometry.triangles.length - 1; 0 <= h; h--) {
			g = this.geometry.triangles[h];
			FSS.Vector4.set(g.color.rgba);
			for (l = b.length - 1; 0 <= l; l--) n = b[l],
			FSS.Vector3.subtractVectors(n.ray, n.position, g.centroid),
			FSS.Vector3.normalise(n.ray),
			s = FSS.Vector3.dot(g.normal, n.ray),
			this.side === FSS.FRONT ? s = Math.max(s, 0) : this.side === FSS.BACK ? s = Math.abs(Math.min(s, 0)) : this.side === FSS.DOUBLE && (s = Math.max(Math.abs(s), 0)),
			FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.ambient.rgba, n.ambient.rgba),
			FSS.Vector4.add(g.color.rgba, this.material.slave.rgba),
			FSS.Vector4.multiplyVectors(this.material.slave.rgba, this.material.diffuse.rgba, n.diffuse.rgba),
			FSS.Vector4.multiplyScalar(this.material.slave.rgba, s),
			FSS.Vector4.add(g.color.rgba, this.material.slave.rgba);
			FSS.Vector4.clamp(g.color.rgba, 0, 1)
		}
		return this
	};
	FSS.Scene = function() {
		this.meshes = [];
		this.lights = []
	};
	FSS.Scene.prototype = {
		add: function(b) {
			b instanceof FSS.Mesh && !~this.meshes.indexOf(b) ? this.meshes.push(b) : b instanceof FSS.Light && !~this.lights.indexOf(b) && this.lights.push(b);
			return this
		},
		remove: function(b) {
			b instanceof FSS.Mesh && ~this.meshes.indexOf(b) ? this.meshes.splice(this.meshes.indexOf(b), 1) : b instanceof FSS.Light && ~this.lights.indexOf(b) && this.lights.splice(this.lights.indexOf(b), 1);
			return this
		}
	};
	FSS.Renderer = function() {
		this.halfHeight = this.halfWidth = this.height = this.width = 0
	};
	FSS.Renderer.prototype = {
		setSize: function(b, d) {
			if (this.width !== b || this.height !== d) return this.width = b,
			this.height = d,
			this.halfWidth = 0.5 * this.width,
			this.halfHeight = 0.5 * this.height,
			this
		},
		clear: function() {
			return this
		},
		render: function(b) {
			return this
		}
	};
	FSS.CanvasRenderer = function() {
		FSS.Renderer.call(this);
		this.element = document.createElement("canvas");
		this.element.style.display = "block";
		this.context = this.element.getContext("2d");
		this.setSize(this.element.width, this.element.height)
	};
	FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype);
	FSS.CanvasRenderer.prototype.setSize = function(b, d) {
		FSS.Renderer.prototype.setSize.call(this, b, d);
		this.element.width = b;
		this.element.height = d;
		this.context.setTransform(1, 0, 0, -1, this.halfWidth, this.halfHeight);
		return this
	};
	FSS.CanvasRenderer.prototype.clear = function() {
		FSS.Renderer.prototype.clear.call(this);
		this.context.clearRect( - this.halfWidth, -this.halfHeight, this.width, this.height);
		return this
	};
	FSS.CanvasRenderer.prototype.render = function(b) {
		FSS.Renderer.prototype.render.call(this, b);
		var d,
		h,
		g,
		l,
		n;
		this.clear();
		this.context.lineJoin = "round";
		this.context.lineWidth = 1;
		for (d = b.meshes.length - 1; 0 <= d; d--) if (h = b.meshes[d], h.visible) for (h.update(b.lights, !0), g = h.geometry.triangles.length - 1; 0 <= g; g--) l = h.geometry.triangles[g],
		n = l.color.format(),
		this.context.beginPath(),
		this.context.moveTo(l.a.position[0], l.a.position[1]),
		this.context.lineTo(l.b.position[0], l.b.position[1]),
		this.context.lineTo(l.c.position[0], l.c.position[1]),
		this.context.closePath(),
		this.context.strokeStyle = n,
		this.context.fillStyle = n,
		this.context.stroke(),
		this.context.fill();
		return this
	};
	FSS.WebGLRenderer = function() {
		FSS.Renderer.call(this);
		this.element = document.createElement("canvas");
		this.element.style.display = "block";
		this.lights = this.vertices = null;
		this.gl = this.getContext(this.element, {
			preserveDrawingBuffer: !1,
			premultipliedAlpha: !0,
			antialias: !0,
			stencil: !0,
			alpha: !0
		});
		if (this.unsupported = !this.gl) return "WebGL is not supported by your browser.";
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.setSize(this.element.width, this.element.height)
	};
	FSS.WebGLRenderer.prototype = Object.create(FSS.Renderer.prototype);
	FSS.WebGLRenderer.prototype.getContext = function(b, d) {
		var h = !1;
		try {
			if (! (h = b.getContext("experimental-webgl", d))) throw "Error creating WebGL context.";
		} catch(g) {
			// console.error(g);
		}
		return h
	};
	FSS.WebGLRenderer.prototype.setSize = function(b, d) {
		FSS.Renderer.prototype.setSize.call(this, b, d);
		if (!this.unsupported) return this.element.width = b,
		this.element.height = d,
		this.gl.viewport(0, 0, b, d),
		this
	};
	FSS.WebGLRenderer.prototype.clear = function() {
		FSS.Renderer.prototype.clear.call(this);
		if (!this.unsupported) return this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT),
		this
	};
	FSS.WebGLRenderer.prototype.render = function(b) {
		FSS.Renderer.prototype.render.call(this, b);
		if (!this.unsupported) {
			var d,
			h,
			g,
			l,
			n,
			s,
			k,
			m;
			s = !1;
			var r = b.lights.length,
			u,
			E,
			y,
			z = 0;
			this.clear();
			if (this.lights !== r) if (this.lights = r, 0 < this.lights) this.buildProgram(r);
			else return;
			if (this.program) {
				for (d = b.meshes.length - 1; 0 <= d; d--) h = b.meshes[d],
				h.geometry.dirty && (s = !0),
				h.update(b.lights, !1),
				z += 3 * h.geometry.triangles.length;
				if (s || this.vertices !== z) for (k in this.vertices = z, this.program.attributes) {
					s = this.program.attributes[k];
					s.data = new FSS.Array(z * s.size);
					u = 0;
					for (d = b.meshes.length - 1; 0 <= d; d--) for (h = b.meshes[d], g = 0, l = h.geometry.triangles.length; g < l; g++) for (n = h.geometry.triangles[g], E = 0, y = n.vertices.length; E < y; E++) {
						vertex = n.vertices[E];
						switch (k) {
						case "side":
							this.setBufferData(u, s, h.side);
							break;
						case "position":
							this.setBufferData(u, s, vertex.position);
							break;
						case "centroid":
							this.setBufferData(u, s, n.centroid);
							break;
						case "normal":
							this.setBufferData(u, s, n.normal);
							break;
						case "ambient":
							this.setBufferData(u, s, h.material.ambient.rgba);
							break;
						case "diffuse":
							this.setBufferData(u, s, h.material.diffuse.rgba)
						}
						u++
					}
					this.gl.bindBuffer(this.gl.ARRAY_BUFFER, s.buffer);
					this.gl.bufferData(this.gl.ARRAY_BUFFER, s.data, this.gl.DYNAMIC_DRAW);
					this.gl.enableVertexAttribArray(s.location);
					this.gl.vertexAttribPointer(s.location, s.size, this.gl.FLOAT, !1, 0, 0)
				}
				this.setBufferData(0, this.program.uniforms.resolution, [this.width, this.height, this.width]);
				for (s = r - 1; 0 <= s; s--) d = b.lights[s],
				this.setBufferData(s, this.program.uniforms.lightPosition, d.position),
				this.setBufferData(s, this.program.uniforms.lightAmbient, d.ambient.rgba),
				this.setBufferData(s, this.program.uniforms.lightDiffuse, d.diffuse.rgba);
				for (m in this.program.uniforms) switch (s = this.program.uniforms[m], d = s.location, b = s.data, s.structure) {
				case "3f":
					this.gl.uniform3f(d, b[0], b[1], b[2]);
					break;
				case "3fv":
					this.gl.uniform3fv(d, b);
					break;
				case "4fv":
					this.gl.uniform4fv(d, b)
				}
			}
			this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices);
			return this
		}
	};
	FSS.WebGLRenderer.prototype.setBufferData = function(b, d, h) {
		if (FSS.Utils.isNumber(h)) d.data[b * d.size] = h;
		else for (var g = h.length - 1; 0 <= g; g--) d.data[b * d.size + g] = h[g]
	};
	FSS.WebGLRenderer.prototype.buildProgram = function(b) {
		if (!this.unsupported) {
			var d = FSS.WebGLRenderer.VS(b),
			h = FSS.WebGLRenderer.FS(b),
			g = d + h;
			if (!this.program || this.program.code !== g) {
				var l = this.gl.createProgram(),
				d = this.buildShader(this.gl.VERTEX_SHADER, d),
				h = this.buildShader(this.gl.FRAGMENT_SHADER, h);
				this.gl.attachShader(l, d);
				this.gl.attachShader(l, h);
				this.gl.linkProgram(l);
				if (!this.gl.getProgramParameter(l, this.gl.LINK_STATUS)) return b = this.gl.getError(),
				l = this.gl.getProgramParameter(l, this.gl.VALIDATE_STATUS),
				console.error("Could not initialise shader.\nVALIDATE_STATUS: " + l + "\nERROR: " + b),
				null;
				this.gl.deleteShader(h);
				this.gl.deleteShader(d);
				l.code = g;
				l.attributes = {
					side: this.buildBuffer(l, "attribute", "aSide", 1, "f"),
					position: this.buildBuffer(l, "attribute", "aPosition", 3, "v3"),
					centroid: this.buildBuffer(l, "attribute", "aCentroid", 3, "v3"),
					normal: this.buildBuffer(l, "attribute", "aNormal", 3, "v3"),
					ambient: this.buildBuffer(l, "attribute", "aAmbient", 4, "v4"),
					diffuse: this.buildBuffer(l, "attribute", "aDiffuse", 4, "v4")
				};
				l.uniforms = {
					resolution: this.buildBuffer(l, "uniform", "uResolution", 3, "3f", 1),
					lightPosition: this.buildBuffer(l, "uniform", "uLightPosition", 3, "3fv", b),
					lightAmbient: this.buildBuffer(l, "uniform", "uLightAmbient", 4, "4fv", b),
					lightDiffuse: this.buildBuffer(l, "uniform", "uLightDiffuse", 4, "4fv", b)
				};
				this.program = l;
				this.gl.useProgram(this.program);
				return l
			}
		}
	};
	FSS.WebGLRenderer.prototype.buildShader = function(b, d) {
		if (!this.unsupported) {
			var h = this.gl.createShader(b);
			this.gl.shaderSource(h, d);
			this.gl.compileShader(h);
			return this.gl.getShaderParameter(h, this.gl.COMPILE_STATUS) ? h: (console.error(this.gl.getShaderInfoLog(h)), null)
		}
	};
	FSS.WebGLRenderer.prototype.buildBuffer = function(b, d, h, g, l, n) {
		l = {
			buffer: this.gl.createBuffer(),
			size: g,
			structure: l,
			data: null
		};
		switch (d) {
		case "attribute":
			l.location = this.gl.getAttribLocation(b, h);
			break;
		case "uniform":
			l.location = this.gl.getUniformLocation(b, h)
		}
		n && (l.data = new FSS.Array(n * g));
		return l
	};
	FSS.WebGLRenderer.VS = function(b) {
		return ["precision mediump float;", "#define LIGHTS " + b, "attribute float aSide;\nattribute vec3 aPosition;\nattribute vec3 aCentroid;\nattribute vec3 aNormal;\nattribute vec4 aAmbient;\nattribute vec4 aDiffuse;\nuniform vec3 uResolution;\nuniform vec3 uLightPosition[LIGHTS];\nuniform vec4 uLightAmbient[LIGHTS];\nuniform vec4 uLightDiffuse[LIGHTS];\nvarying vec4 vColor;\nvoid main() {\nvColor = vec4(0.0);\nvec3 position = aPosition / uResolution * 2.0;\nfor (int i = 0; i < LIGHTS; i++) {\nvec3 lightPosition = uLightPosition[i];\nvec4 lightAmbient = uLightAmbient[i];\nvec4 lightDiffuse = uLightDiffuse[i];\nvec3 ray = normalize(lightPosition - aCentroid);\nfloat illuminance = dot(aNormal, ray);\nif (aSide == 0.0) {\nilluminance = max(illuminance, 0.0);\n} else if (aSide == 1.0) {\nilluminance = abs(min(illuminance, 0.0));\n} else if (aSide == 2.0) {\nilluminance = max(abs(illuminance), 0.0);\n}\nvColor += aAmbient * lightAmbient;\nvColor += aDiffuse * lightDiffuse * illuminance;\n}\nvColor = clamp(vColor, 0.0, 1.0);\ngl_Position = vec4(position, 1.0);\n}"].join("\n")
	};
	FSS.WebGLRenderer.FS = function(b) {
		return "precision mediump float;\nvarying vec4 vColor;\nvoid main() {\ngl_FragColor = vColor;\n}"
	};
	FSS.SVGRenderer = function() {
		FSS.Renderer.call(this);
		this.element = document.createElementNS(FSS.SVGNS, "svg");
		this.element.setAttribute("xmlns", FSS.SVGNS);
		this.element.setAttribute("version", "1.1");
		this.element.style.display = "block";
		this.setSize(300, 150)
	};
	FSS.SVGRenderer.prototype = Object.create(FSS.Renderer.prototype);
	FSS.SVGRenderer.prototype.setSize = function(b, d) {
		FSS.Renderer.prototype.setSize.call(this, b, d);
		this.element.setAttribute("width", b);
		this.element.setAttribute("height", d);
		return this
	};
	FSS.SVGRenderer.prototype.clear = function() {
		FSS.Renderer.prototype.clear.call(this);
		for (var b = this.element.childNodes.length - 1; 0 <= b; b--) this.element.removeChild(this.element.childNodes[b]);
		return this
	};
	FSS.SVGRenderer.prototype.render = function(b) {
		FSS.Renderer.prototype.render.call(this, b);
		var d,
		h,
		g,
		l,
		n,
		s;
		for (d = b.meshes.length - 1; 0 <= d; d--) if (h = b.meshes[d], h.visible) for (h.update(b.lights, !0), g = h.geometry.triangles.length - 1; 0 <= g; g--) l = h.geometry.triangles[g],
		l.polygon.parentNode !== this.element && this.element.appendChild(l.polygon),
		n = this.formatPoint(l.a) + " ",
		n += this.formatPoint(l.b) + " ",
		n += this.formatPoint(l.c),
		s = this.formatStyle(l.color.format()),
		l.polygon.setAttributeNS(null, "points", n),
		l.polygon.setAttributeNS(null, "style", s);
		return this
	};
	FSS.SVGRenderer.prototype.formatPoint = function(b) {
		return this.halfWidth + b.position[0] + "," + (this.halfHeight - b.position[1])
	};
	FSS.SVGRenderer.prototype.formatStyle = function(b) {
		return b = "fill:" + b + ";" + ("stroke:" + b + ";")
	};

	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
	function() {
		function b() {
			B.remove(G);
			D.clear();
			H = new FSS.Plane(l.width * D.width, l.height * D.height, l.segments, l.slices);
			J = new FSS.Material(l.ambient, l.diffuse);
			G = new FSS.Mesh(H, J);
			B.add(G);
			var b,
			d;
			for (b = H.vertices.length - 1; 0 <= b; b--) d = H.vertices[b],
			d.anchor = FSS.Vector3.clone(d.position),
			d.step = FSS.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1)),
			d.time = Math.randomInRange(0, Math.PIM2)
		}
		function d(d, g) {
			D.setSize(d, g);
			FSS.Vector3.set(E, D.halfWidth, D.halfHeight);
			b()
		}
		function h() {
			r = Date.now() - u;
			var b,
			d,
			k,
			m,
			s,
			z = l.depth / 2;
			FSS.Vector3.copy(n.bounds, E);
			FSS.Vector3.multiplyScalar(n.bounds, n.xyScalar);
			FSS.Vector3.setZ(y, n.zOffset);
			n.autopilot && (b = Math.sin(n.step[0] * r * n.speed), d = Math.cos(n.step[1] * r * n.speed), FSS.Vector3.set(y, n.bounds[0] * b, n.bounds[1] * d, n.zOffset));
			for (b = B.lights.length - 1; 0 <= b; b--) d = B.lights[b],
			FSS.Vector3.setZ(d.position, n.zOffset),
			k = Math.clamp(FSS.Vector3.distanceSquared(d.position, y), n.minDistance, n.maxDistance),
			k = n.gravity * d.mass / k,
			FSS.Vector3.subtractVectors(d.force, y, d.position),
			FSS.Vector3.normalise(d.force),
			FSS.Vector3.multiplyScalar(d.force, k),
			FSS.Vector3.set(d.acceleration),
			FSS.Vector3.add(d.acceleration, d.force),
			FSS.Vector3.add(d.velocity, d.acceleration),
			FSS.Vector3.multiplyScalar(d.velocity, n.dampening),
			FSS.Vector3.limit(d.velocity, n.minLimit, n.maxLimit),
			FSS.Vector3.add(d.position, d.velocity);
			for (m = H.vertices.length - 1; 0 <= m; m--) s = H.vertices[m],
			b = Math.sin(s.time + s.step[0] * r * l.speed),
			d = Math.cos(s.time + s.step[1] * r * l.speed),
			k = Math.sin(s.time + s.step[2] * r * l.speed),
			FSS.Vector3.set(s.position, l.xRange * H.segmentWidth * b, l.yRange * H.sliceHeight * d, l.zRange * z * k - z),
			FSS.Vector3.add(s.position, s.anchor);
			H.dirty = !0;
			g();
			requestAnimationFrame(h)
		}
		function g() {
			D.render(B);
			if (n.draw) {
				var b,
				d,
				g,
				h;
				for (b = B.lights.length - 1; 0 <= b; b--) switch (h = B.lights[b], d = h.position[0], g = h.position[1], m.renderer) {
				case s:
					D.context.lineWidth = 0.5;
					D.context.beginPath();
					D.context.arc(d, g, 10, 0, Math.PIM2);
					D.context.strokeStyle = h.ambientHex;
					D.context.stroke();
					D.context.beginPath();
					D.context.arc(d, g, 4, 0, Math.PIM2);
					D.context.fillStyle = h.diffuseHex;
					D.context.fill();
					break;
				case k:
					d += D.halfWidth,
					g = D.halfHeight - g,
					h.core.setAttributeNS(null, "fill", h.diffuseHex),
					h.core.setAttributeNS(null, "cx", d),
					h.core.setAttributeNS(null, "cy", g),
					D.element.appendChild(h.core),
					h.ring.setAttributeNS(null, "stroke", h.ambientHex),
					h.ring.setAttributeNS(null, "cx", d),
					h.ring.setAttributeNS(null, "cy", g),
					D.element.appendChild(h.ring)
				}
			}
		}
		var l = {
			width: 1.8,
			height: 1.8,
			depth: 10,
			segments: 16,
			slices: 8,
			xRange: 0.8,
			yRange: 0.1,
			zRange: 1,
			ambient: "#010101",
			diffuse: "#ffffff",
			speed: 6E-4,
			opacity: 0.5
		},
		n = {
			count: 2,
			xyScalar: 1,
			zOffset: 100,
			ambient: "#ffffff",
			diffuse: "#2d2d2d",
			speed: 0.001,
			gravity: 800,
			dampening: 0.95,
			minLimit: 10,
			maxLimit: null,
			minDistance: 20,
			maxDistance: 400,
			autopilot: !1,
			draw: !1,
			bounds: FSS.Vector3.create(),
			step: FSS.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))
		},
		s = "canvas",
		k = "svg",
		m = {
			renderer: s
		},
		r,
		u = Date.now(),
		E = FSS.Vector3.create(),
		y = FSS.Vector3.create(),
		z = document.getElementById(container || "container");
		document.getElementById("controls");
		var X = document.getElementById(output || "output");
		document.getElementById("ui");
		var D,
		B,
		G,
		H,
		J,
		R,
		C,
		S;
		R = new FSS.WebGLRenderer;
		C = new FSS.CanvasRenderer;
		S = new FSS.SVGRenderer; (function(b) {
			D && X.removeChild(D.element);
			switch (b) {
			case "webgl":
				D = R;
				break;
			case s:
				D = C;
				break;
			case k:
				D = S
			}
			D.setSize(z.offsetWidth, z.offsetHeight);
			X.appendChild(D.element)
		})(m.renderer);
		B = new FSS.Scene;
		b(); (function() {
			var b,
			d;
			for (b = B.lights.length -
			1; 0 <= b; b--) d = B.lights[b],
			B.remove(d);
			D.clear();
			for (b = 0; b < n.count; b++) d = new FSS.Light(n.ambient, n.diffuse),
			d.ambientHex = d.ambient.format(),
			d.diffuseHex = d.diffuse.format(),
			B.add(d),
			d.mass = Math.randomInRange(0.5, 1),
			d.velocity = FSS.Vector3.create(),
			d.acceleration = FSS.Vector3.create(),
			d.force = FSS.Vector3.create(),
			d.ring = document.createElementNS(FSS.SVGNS, "circle"),
			d.ring.setAttributeNS(null, "stroke", d.ambientHex),
			d.ring.setAttributeNS(null, "stroke-width", "0.5"),
			d.ring.setAttributeNS(null, "fill", "none"),
			d.ring.setAttributeNS(null, "r", "10"),
			d.core = document.createElementNS(FSS.SVGNS, "circle"),
			d.core.setAttributeNS(null, "fill", d.diffuseHex),
			d.core.setAttributeNS(null, "r", "4")
		})();
		window.addEventListener("resize",
		function(b) {
			d(z.offsetWidth, z.offsetHeight);
			g()
		});
		z.addEventListener("click",
		function(b) {
			FSS.Vector3.set(y, b.x, D.height - b.y);
			FSS.Vector3.subtract(y, E);
			n.autopilot = !n.autopilot; (void 0).updateDisplay()
		});
		z.addEventListener("mousemove",
		function(b) {
			FSS.Vector3.set(y, b.x, D.height - b.y);
			FSS.Vector3.subtract(y, E)
		});
		d(z.offsetWidth, z.offsetHeight);
		h()
	} ();

}