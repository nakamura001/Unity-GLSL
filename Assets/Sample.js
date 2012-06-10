#pragma strict

private var mat: Material;

function Start () {
	mat = renderer.material;
}

function setHue(degree: float, alpha: float): Vector4 {
	var r: float;
	var g: float;
	var b: float;
	var a: float;
	// 0 <= degree <= 360 になるように変換
	if (degree < 0f) {	// 角度がマイナスのとき
		degree = 360 + degree + 360 * Mathf.Floor(-degree) / 360;
	} else if (360 < degree) {	// 角度が360度を超えているとき
		degree = degree - (360 * (Mathf.Floor(degree) / 360));
	}
	if (degree <= 60.0f) {
		r = 1.0f;
		g = degree / 60.0f;
		b = 0.0f;
	} else if (degree <= 120.0f) {
		r = (1.0f - (degree - 60.0f) / 60.0f);
		g = 1.0f;
		b = 0;
	} else if (degree <= 180.0f) {
		r = 0.0f;
		g = 1.0f;
		b = (degree - 120.0f) / 60.0f;
	} else if (degree <= 240.0f) {
		r = 0.0f;
		g = 1.0f - (degree - 180.0f) / 60.0f;
		b = 1.0f;
	} else if (degree <= 300.0f) {
		r = (degree - 240.0f) / 60.0f;
		g = 0.0f;
		b = 1.0f;
	} else {
		r = 1.0f;
		g = 0.0f;
		b = 1.0f - (degree - 300.0f) / 60.0f;
	}
	a = alpha;
	return new Vector4(r, g, b, a);
}

function Update () {
	var alpha: float = (Mathf.Sin(Mathf.PI * Time.time / 2.0f) + 1.0f) / 2.0f;
//	Debug.Log(alpha);
	mat.SetFloat("_u_alpha", alpha);
	
	var color: Vector4 = setHue(((Time.time / 8.0) % 1.0) * 360.0f, 1.0f);
//	Debug.Log(color);
	mat.SetVector("_u_color", color);
	
	mat.SetVector("a_texCoord", new Vector4(0.5f, 0.0f, 0.0f, 0.0f));
}
