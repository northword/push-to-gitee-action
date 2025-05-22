import { createRequire } from "node:module";
import path from "node:path";
import process$1 from "node:process";
import { debug, endGroup, error, getInput, info, setFailed, startGroup } from "@actions/core";
import { copySync, ensureDirSync, outputFileSync } from "fs-extra/esm";
import { spawn } from "child_process";
import path$1, { delimiter, dirname, normalize, posix, resolve } from "path";
import { cwd } from "process";
import { PassThrough } from "stream";
import me from "readline";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region node_modules/.pnpm/tinyexec@1.0.1/node_modules/tinyexec/dist/main.js
const require$1 = createRequire(import.meta.url);
var St = Object.create;
var $ = Object.defineProperty;
var kt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var At = Object.getPrototypeOf, Rt = Object.prototype.hasOwnProperty;
var h = /* @__PURE__ */ ((t) => typeof require$1 < "u" ? require$1 : typeof Proxy < "u" ? new Proxy(t, { get: (e, n) => (typeof require$1 < "u" ? require$1 : e)[n] }) : t)(function(t) {
	if (typeof require$1 < "u") return require$1.apply(this, arguments);
	throw Error("Dynamic require of \"" + t + "\" is not supported");
});
var l = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var $t = (t, e, n, r) => {
	if (e && typeof e == "object" || typeof e == "function") for (let s of Tt(e)) !Rt.call(t, s) && s !== n && $(t, s, {
		get: () => e[s],
		enumerable: !(r = kt(e, s)) || r.enumerable
	});
	return t;
};
var Nt = (t, e, n) => (n = t != null ? St(At(t)) : {}, $t(e || !t || !t.__esModule ? $(n, "default", {
	value: t,
	enumerable: !0
}) : n, t));
var W = l((Se, H) => {
	"use strict";
	H.exports = z;
	z.sync = Wt;
	var j = h("fs");
	function Ht(t, e) {
		var n = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
		if (!n || (n = n.split(";"), n.indexOf("") !== -1)) return !0;
		for (var r = 0; r < n.length; r++) {
			var s = n[r].toLowerCase();
			if (s && t.substr(-s.length).toLowerCase() === s) return !0;
		}
		return !1;
	}
	function F(t, e, n) {
		return !t.isSymbolicLink() && !t.isFile() ? !1 : Ht(e, n);
	}
	function z(t, e, n) {
		j.stat(t, function(r, s) {
			n(r, r ? !1 : F(s, t, e));
		});
	}
	function Wt(t, e) {
		return F(j.statSync(t), t, e);
	}
});
var X = l((ke, B) => {
	"use strict";
	B.exports = K;
	K.sync = Dt;
	var D = h("fs");
	function K(t, e, n) {
		D.stat(t, function(r, s) {
			n(r, r ? !1 : M(s, e));
		});
	}
	function Dt(t, e) {
		return M(D.statSync(t), e);
	}
	function M(t, e) {
		return t.isFile() && Kt(t, e);
	}
	function Kt(t, e) {
		var n = t.mode, r = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), i = e.gid !== void 0 ? e.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), f = a | c, p = n & u || n & c && s === i || n & a && r === o || n & f && o === 0;
		return p;
	}
});
var U = l((Ae, G) => {
	"use strict";
	var Te = h("fs"), v;
	process.platform === "win32" || global.TESTING_WINDOWS ? v = W() : v = X();
	G.exports = y;
	y.sync = Mt;
	function y(t, e, n) {
		if (typeof e == "function" && (n = e, e = {}), !n) {
			if (typeof Promise != "function") throw new TypeError("callback not provided");
			return new Promise(function(r, s) {
				y(t, e || {}, function(o, i) {
					o ? s(o) : r(i);
				});
			});
		}
		v(t, e || {}, function(r, s) {
			r && (r.code === "EACCES" || e && e.ignoreErrors) && (r = null, s = !1), n(r, s);
		});
	}
	function Mt(t, e) {
		try {
			return v.sync(t, e || {});
		} catch (n) {
			if (e && e.ignoreErrors || n.code === "EACCES") return !1;
			throw n;
		}
	}
});
var et = l((Re, tt) => {
	"use strict";
	var g = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Y = h("path"), Bt = g ? ";" : ":", V = U(), J = (t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), Q = (t, e) => {
		let n = e.colon || Bt, r = t.match(/\//) || g && t.match(/\\/) ? [""] : [...g ? [process.cwd()] : [], ...(e.path || process.env.PATH || "").split(n)], s = g ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = g ? s.split(n) : [""];
		return g && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
			pathEnv: r,
			pathExt: o,
			pathExtExe: s
		};
	}, Z = (t, e, n) => {
		typeof e == "function" && (n = e, e = {}), e || (e = {});
		let { pathEnv: r, pathExt: s, pathExtExe: o } = Q(t, e), i = [], a = (u) => new Promise((f, p) => {
			if (u === r.length) return e.all && i.length ? f(i) : p(J(t));
			let d = r[u], w = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Y.join(w, t), b = !w && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + m : m;
			f(c(b, u, 0));
		}), c = (u, f, p) => new Promise((d, w) => {
			if (p === s.length) return d(a(f + 1));
			let m = s[p];
			V(u + m, { pathExt: o }, (b, Ot) => {
				if (!b && Ot) if (e.all) i.push(u + m);
				else return d(u + m);
				return d(c(u, f, p + 1));
			});
		});
		return n ? a(0).then((u) => n(null, u), n) : a(0);
	}, Xt = (t, e) => {
		e = e || {};
		let { pathEnv: n, pathExt: r, pathExtExe: s } = Q(t, e), o = [];
		for (let i = 0; i < n.length; i++) {
			let a = n[i], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = Y.join(c, t), f = !c && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + u : u;
			for (let p = 0; p < r.length; p++) {
				let d = f + r[p];
				try {
					if (V.sync(d, { pathExt: s })) if (e.all) o.push(d);
					else return d;
				} catch {}
			}
		}
		if (e.all && o.length) return o;
		if (e.nothrow) return null;
		throw J(t);
	};
	tt.exports = Z;
	Z.sync = Xt;
});
var rt = l(($e, _) => {
	"use strict";
	var nt = (t = {}) => {
		let e = t.env || process.env;
		return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
	};
	_.exports = nt;
	_.exports.default = nt;
});
var ct = l((Ne, it) => {
	"use strict";
	var st = h("path"), Gt = et(), Ut = rt();
	function ot(t, e) {
		let n = t.options.env || process.env, r = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.disabled;
		if (o) try {
			process.chdir(t.options.cwd);
		} catch {}
		let i;
		try {
			i = Gt.sync(t.command, {
				path: n[Ut({ env: n })],
				pathExt: e ? st.delimiter : void 0
			});
		} catch {} finally {
			o && process.chdir(r);
		}
		return i && (i = st.resolve(s ? t.options.cwd : "", i)), i;
	}
	function Yt(t) {
		return ot(t) || ot(t, !0);
	}
	it.exports = Yt;
});
var ut = l((qe, P) => {
	"use strict";
	var C = /([()\][%!^"`<>&|;, *?])/g;
	function Vt(t) {
		return t = t.replace(C, "^$1"), t;
	}
	function Jt(t, e) {
		return t = `${t}`, t = t.replace(/(\\*)"/g, "$1$1\\\""), t = t.replace(/(\\*)$/, "$1$1"), t = `"${t}"`, t = t.replace(C, "^$1"), e && (t = t.replace(C, "^$1")), t;
	}
	P.exports.command = Vt;
	P.exports.argument = Jt;
});
var lt = l((Ie, at) => {
	"use strict";
	at.exports = /^#!(.*)/;
});
var dt = l((Le, pt) => {
	"use strict";
	var Qt = lt();
	pt.exports = (t = "") => {
		let e = t.match(Qt);
		if (!e) return null;
		let [n, r] = e[0].replace(/#! ?/, "").split(" "), s = n.split("/").pop();
		return s === "env" ? r : r ? `${s} ${r}` : s;
	};
});
var ht = l((je, ft) => {
	"use strict";
	var O = h("fs"), Zt = dt();
	function te(t) {
		let n = Buffer.alloc(150), r;
		try {
			r = O.openSync(t, "r"), O.readSync(r, n, 0, 150, 0), O.closeSync(r);
		} catch {}
		return Zt(n.toString());
	}
	ft.exports = te;
});
var wt = l((Fe, Et) => {
	"use strict";
	var ee = h("path"), mt = ct(), gt = ut(), ne = ht(), re = process.platform === "win32", se = /\.(?:com|exe)$/i, oe = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
	function ie(t) {
		t.file = mt(t);
		let e = t.file && ne(t.file);
		return e ? (t.args.unshift(t.file), t.command = e, mt(t)) : t.file;
	}
	function ce(t) {
		if (!re) return t;
		let e = ie(t), n = !se.test(e);
		if (t.options.forceShell || n) {
			let r = oe.test(e);
			t.command = ee.normalize(t.command), t.command = gt.command(t.command), t.args = t.args.map((o) => gt.argument(o, r));
			let s = [t.command].concat(t.args).join(" ");
			t.args = [
				"/d",
				"/s",
				"/c",
				`"${s}"`
			], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = !0;
		}
		return t;
	}
	function ue(t, e, n) {
		e && !Array.isArray(e) && (n = e, e = null), e = e ? e.slice(0) : [], n = Object.assign({}, n);
		let r = {
			command: t,
			args: e,
			options: n,
			file: void 0,
			original: {
				command: t,
				args: e
			}
		};
		return n.shell ? r : ce(r);
	}
	Et.exports = ue;
});
var bt = l((ze, vt) => {
	"use strict";
	var S = process.platform === "win32";
	function k(t, e) {
		return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
			code: "ENOENT",
			errno: "ENOENT",
			syscall: `${e} ${t.command}`,
			path: t.command,
			spawnargs: t.args
		});
	}
	function ae(t, e) {
		if (!S) return;
		let n = t.emit;
		t.emit = function(r, s) {
			if (r === "exit") {
				let o = xt(s, e, "spawn");
				if (o) return n.call(t, "error", o);
			}
			return n.apply(t, arguments);
		};
	}
	function xt(t, e) {
		return S && t === 1 && !e.file ? k(e.original, "spawn") : null;
	}
	function le(t, e) {
		return S && t === 1 && !e.file ? k(e.original, "spawnSync") : null;
	}
	vt.exports = {
		hookChildProcess: ae,
		verifyENOENT: xt,
		verifyENOENTSync: le,
		notFoundError: k
	};
});
var Ct = l((He, E) => {
	"use strict";
	var yt = h("child_process"), T = wt(), A = bt();
	function _t(t, e, n) {
		let r = T(t, e, n), s = yt.spawn(r.command, r.args, r.options);
		return A.hookChildProcess(s, r), s;
	}
	function pe(t, e, n) {
		let r = T(t, e, n), s = yt.spawnSync(r.command, r.args, r.options);
		return s.error = s.error || A.verifyENOENTSync(s.status, r), s;
	}
	E.exports = _t;
	E.exports.spawn = _t;
	E.exports.sync = pe;
	E.exports._parse = T;
	E.exports._enoent = A;
});
var Lt = /^path$/i, q = {
	key: "PATH",
	value: ""
};
function jt(t) {
	for (let e in t) {
		if (!Object.prototype.hasOwnProperty.call(t, e) || !Lt.test(e)) continue;
		let n = t[e];
		return n ? {
			key: e,
			value: n
		} : q;
	}
	return q;
}
function Ft(t, e) {
	let n = e.value.split(delimiter), r = t, s;
	do
		n.push(resolve(r, "node_modules", ".bin")), s = r, r = dirname(r);
	while (r !== s);
	return {
		key: e.key,
		value: n.join(delimiter)
	};
}
function I(t, e) {
	let n = {
		...process.env,
		...e
	}, r = Ft(t, jt(n));
	return n[r.key] = r.value, n;
}
var L = (t) => {
	let e = t.length, n = new PassThrough(), r = () => {
		--e === 0 && n.emit("end");
	};
	for (let s of t) s.pipe(n, { end: !1 }), s.on("end", r);
	return n;
};
var Pt = Nt(Ct(), 1);
var x = class extends Error {
	result;
	output;
	get exitCode() {
		if (this.result.exitCode !== null) return this.result.exitCode;
	}
	constructor(e, n) {
		super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = n;
	}
};
var ge = {
	timeout: void 0,
	persist: !1
}, Ee = { windowsHide: !0 };
function we(t, e) {
	return {
		command: normalize(t),
		args: e ?? []
	};
}
function xe(t) {
	let e = new AbortController();
	for (let n of t) {
		if (n.aborted) return e.abort(), n;
		let r = () => {
			e.abort(n.reason);
		};
		n.addEventListener("abort", r, { signal: e.signal });
	}
	return e.signal;
}
var R = class {
	_process;
	_aborted = !1;
	_options;
	_command;
	_args;
	_resolveClose;
	_processClosed;
	_thrownError;
	get process() {
		return this._process;
	}
	get pid() {
		return this._process?.pid;
	}
	get exitCode() {
		if (this._process && this._process.exitCode !== null) return this._process.exitCode;
	}
	constructor(e, n, r) {
		this._options = {
			...ge,
			...r
		}, this._command = e, this._args = n ?? [], this._processClosed = new Promise((s) => {
			this._resolveClose = s;
		});
	}
	kill(e) {
		return this._process?.kill(e) === !0;
	}
	get aborted() {
		return this._aborted;
	}
	get killed() {
		return this._process?.killed === !0;
	}
	pipe(e, n, r) {
		return be(e, n, {
			...r,
			stdin: this
		});
	}
	async *[Symbol.asyncIterator]() {
		let e = this._process;
		if (!e) return;
		let n = [];
		this._streamErr && n.push(this._streamErr), this._streamOut && n.push(this._streamOut);
		let r = L(n), s = me.createInterface({ input: r });
		for await (let o of s) yield o.toString();
		if (await this._processClosed, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0) throw new x(this);
	}
	async _waitForOutput() {
		let e = this._process;
		if (!e) throw new Error("No process was started");
		let n = "", r = "";
		if (this._streamOut) for await (let o of this._streamOut) r += o.toString();
		if (this._streamErr) for await (let o of this._streamErr) n += o.toString();
		if (await this._processClosed, this._options?.stdin && await this._options.stdin, e.removeAllListeners(), this._thrownError) throw this._thrownError;
		let s = {
			stderr: n,
			stdout: r,
			exitCode: this.exitCode
		};
		if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0) throw new x(this, s);
		return s;
	}
	then(e, n) {
		return this._waitForOutput().then(e, n);
	}
	_streamOut;
	_streamErr;
	spawn() {
		let e = cwd(), n = this._options, r = {
			...Ee,
			...n.nodeOptions
		}, s = [];
		this._resetState(), n.timeout !== void 0 && s.push(AbortSignal.timeout(n.timeout)), n.signal !== void 0 && s.push(n.signal), n.persist === !0 && (r.detached = !0), s.length > 0 && (r.signal = xe(s)), r.env = I(e, r.env);
		let { command: o, args: i } = we(this._command, this._args), a = (0, Pt._parse)(o, i, r), c = spawn(a.command, a.args, a.options);
		if (c.stderr && (this._streamErr = c.stderr), c.stdout && (this._streamOut = c.stdout), this._process = c, c.once("error", this._onError), c.once("close", this._onClose), n.stdin !== void 0 && c.stdin && n.stdin.process) {
			let { stdout: u } = n.stdin.process;
			u && u.pipe(c.stdin);
		}
	}
	_resetState() {
		this._aborted = !1, this._processClosed = new Promise((e) => {
			this._resolveClose = e;
		}), this._thrownError = void 0;
	}
	_onError = (e) => {
		if (e.name === "AbortError" && (!(e.cause instanceof Error) || e.cause.name !== "TimeoutError")) {
			this._aborted = !0;
			return;
		}
		this._thrownError = e;
	};
	_onClose = () => {
		this._resolveClose && this._resolveClose();
	};
}, ve = (t, e, n) => {
	let r = new R(t, e, n);
	return r.spawn(), r;
}, be = ve;

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/utils.js
var require_utils$1 = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/utils.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.normalizePath = exports.isRootDirectory = exports.convertSlashes = exports.cleanPath = void 0;
	const path_1$4 = __require("path");
	function cleanPath(path$2) {
		let normalized = (0, path_1$4.normalize)(path$2);
		if (normalized.length > 1 && normalized[normalized.length - 1] === path_1$4.sep) normalized = normalized.substring(0, normalized.length - 1);
		return normalized;
	}
	exports.cleanPath = cleanPath;
	const SLASHES_REGEX = /[\\/]/g;
	function convertSlashes(path$2, separator) {
		return path$2.replace(SLASHES_REGEX, separator);
	}
	exports.convertSlashes = convertSlashes;
	function isRootDirectory(path$2) {
		return path$2 === "/" || /^[a-z]:\\$/i.test(path$2);
	}
	exports.isRootDirectory = isRootDirectory;
	function normalizePath(path$2, options) {
		const { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options;
		const pathNeedsCleaning = process.platform === "win32" && path$2.includes("/") || path$2.startsWith(".");
		if (resolvePaths) path$2 = (0, path_1$4.resolve)(path$2);
		if (normalizePath$1 || pathNeedsCleaning) path$2 = cleanPath(path$2);
		if (path$2 === ".") return "";
		const needsSeperator = path$2[path$2.length - 1] !== pathSeparator;
		return convertSlashes(needsSeperator ? path$2 + pathSeparator : path$2, pathSeparator);
	}
	exports.normalizePath = normalizePath;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/join-path.js
var require_join_path = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/join-path.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = exports.joinDirectoryPath = exports.joinPathWithBasePath = void 0;
	const path_1$3 = __require("path");
	const utils_1$1 = require_utils$1();
	function joinPathWithBasePath(filename, directoryPath) {
		return directoryPath + filename;
	}
	exports.joinPathWithBasePath = joinPathWithBasePath;
	function joinPathWithRelativePath(root, options) {
		return function(filename, directoryPath) {
			const sameRoot = directoryPath.startsWith(root);
			if (sameRoot) return directoryPath.replace(root, "") + filename;
			else return (0, utils_1$1.convertSlashes)((0, path_1$3.relative)(root, directoryPath), options.pathSeparator) + options.pathSeparator + filename;
		};
	}
	function joinPath$1(filename) {
		return filename;
	}
	function joinDirectoryPath(filename, directoryPath, separator) {
		return directoryPath + filename + separator;
	}
	exports.joinDirectoryPath = joinDirectoryPath;
	function build$7(root, options) {
		const { relativePaths, includeBasePath } = options;
		return relativePaths && root ? joinPathWithRelativePath(root, options) : includeBasePath ? joinPathWithBasePath : joinPath$1;
	}
	exports.build = build$7;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/push-directory.js
var require_push_directory = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/push-directory.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	function pushDirectoryWithRelativePath(root) {
		return function(directoryPath, paths) {
			paths.push(directoryPath.substring(root.length) || ".");
		};
	}
	function pushDirectoryFilterWithRelativePath(root) {
		return function(directoryPath, paths, filters) {
			const relativePath = directoryPath.substring(root.length) || ".";
			if (filters.every((filter) => filter(relativePath, true))) paths.push(relativePath);
		};
	}
	const pushDirectory$1 = (directoryPath, paths) => {
		paths.push(directoryPath || ".");
	};
	const pushDirectoryFilter = (directoryPath, paths, filters) => {
		const path$2 = directoryPath || ".";
		if (filters.every((filter) => filter(path$2, true))) paths.push(path$2);
	};
	const empty$2 = () => {};
	function build$6(root, options) {
		const { includeDirs, filters, relativePaths } = options;
		if (!includeDirs) return empty$2;
		if (relativePaths) return filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root);
		return filters && filters.length ? pushDirectoryFilter : pushDirectory$1;
	}
	exports.build = build$6;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/push-file.js
var require_push_file = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/push-file.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const pushFileFilterAndCount = (filename, _paths, counts, filters) => {
		if (filters.every((filter) => filter(filename, false))) counts.files++;
	};
	const pushFileFilter = (filename, paths, _counts, filters) => {
		if (filters.every((filter) => filter(filename, false))) paths.push(filename);
	};
	const pushFileCount = (_filename, _paths, counts, _filters) => {
		counts.files++;
	};
	const pushFile$1 = (filename, paths) => {
		paths.push(filename);
	};
	const empty$1 = () => {};
	function build$5(options) {
		const { excludeFiles, filters, onlyCounts } = options;
		if (excludeFiles) return empty$1;
		if (filters && filters.length) return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
		else if (onlyCounts) return pushFileCount;
		else return pushFile$1;
	}
	exports.build = build$5;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/get-array.js
var require_get_array = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/get-array.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const getArray$1 = (paths) => {
		return paths;
	};
	const getArrayGroup = () => {
		return [""].slice(0, 0);
	};
	function build$4(options) {
		return options.group ? getArrayGroup : getArray$1;
	}
	exports.build = build$4;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/group-files.js
var require_group_files = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/group-files.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const groupFiles$1 = (groups, directory, files) => {
		groups.push({
			directory,
			files,
			dir: directory
		});
	};
	const empty = () => {};
	function build$3(options) {
		return options.group ? groupFiles$1 : empty;
	}
	exports.build = build$3;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/resolve-symlink.js
var require_resolve_symlink = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/resolve-symlink.js"(exports) {
	var __importDefault$1 = void 0 && (void 0).__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const fs_1$1 = __importDefault$1(__require("fs"));
	const path_1$2 = __require("path");
	const resolveSymlinksAsync = function(path$2, state, callback$1) {
		const { queue, options: { suppressErrors } } = state;
		queue.enqueue();
		fs_1$1.default.realpath(path$2, (error$1, resolvedPath) => {
			if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
			fs_1$1.default.stat(resolvedPath, (error$2, stat) => {
				if (error$2) return queue.dequeue(suppressErrors ? null : error$2, state);
				if (stat.isDirectory() && isRecursive(path$2, resolvedPath, state)) return queue.dequeue(null, state);
				callback$1(stat, resolvedPath);
				queue.dequeue(null, state);
			});
		});
	};
	const resolveSymlinks = function(path$2, state, callback$1) {
		const { queue, options: { suppressErrors } } = state;
		queue.enqueue();
		try {
			const resolvedPath = fs_1$1.default.realpathSync(path$2);
			const stat = fs_1$1.default.statSync(resolvedPath);
			if (stat.isDirectory() && isRecursive(path$2, resolvedPath, state)) return;
			callback$1(stat, resolvedPath);
		} catch (e) {
			if (!suppressErrors) throw e;
		}
	};
	function build$2(options, isSynchronous) {
		if (!options.resolveSymlinks || options.excludeSymlinks) return null;
		return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
	}
	exports.build = build$2;
	function isRecursive(path$2, resolved, state) {
		if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
		let parent = (0, path_1$2.dirname)(path$2);
		let depth$1 = 1;
		while (parent !== state.root && depth$1 < 2) {
			const resolvedPath = state.symlinks.get(parent);
			const isSameRoot = !!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath));
			if (isSameRoot) depth$1++;
			else parent = (0, path_1$2.dirname)(parent);
		}
		state.symlinks.set(path$2, resolved);
		return depth$1 > 1;
	}
	function isRecursiveUsingRealPaths(resolved, state) {
		return state.visited.includes(resolved + state.options.pathSeparator);
	}
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/invoke-callback.js
var require_invoke_callback = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/invoke-callback.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const onlyCountsSync = (state) => {
		return state.counts;
	};
	const groupsSync = (state) => {
		return state.groups;
	};
	const defaultSync = (state) => {
		return state.paths;
	};
	const limitFilesSync = (state) => {
		return state.paths.slice(0, state.options.maxFiles);
	};
	const onlyCountsAsync = (state, error$1, callback$1) => {
		report(error$1, callback$1, state.counts, state.options.suppressErrors);
		return null;
	};
	const defaultAsync = (state, error$1, callback$1) => {
		report(error$1, callback$1, state.paths, state.options.suppressErrors);
		return null;
	};
	const limitFilesAsync = (state, error$1, callback$1) => {
		report(error$1, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
		return null;
	};
	const groupsAsync = (state, error$1, callback$1) => {
		report(error$1, callback$1, state.groups, state.options.suppressErrors);
		return null;
	};
	function report(error$1, callback$1, output, suppressErrors) {
		if (error$1 && !suppressErrors) callback$1(error$1, output);
		else callback$1(null, output);
	}
	function build$1(options, isSynchronous) {
		const { onlyCounts, group, maxFiles } = options;
		if (onlyCounts) return isSynchronous ? onlyCountsSync : onlyCountsAsync;
		else if (group) return isSynchronous ? groupsSync : groupsAsync;
		else if (maxFiles) return isSynchronous ? limitFilesSync : limitFilesAsync;
		else return isSynchronous ? defaultSync : defaultAsync;
	}
	exports.build = build$1;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/walk-directory.js
var require_walk_directory = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/functions/walk-directory.js"(exports) {
	var __importDefault = void 0 && (void 0).__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.build = void 0;
	const fs_1 = __importDefault(__require("fs"));
	const readdirOpts = { withFileTypes: true };
	const walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
		if (currentDepth < 0) return state.queue.dequeue(null, state);
		state.visited.push(crawlPath);
		state.counts.directories++;
		state.queue.enqueue();
		fs_1.default.readdir(crawlPath || ".", readdirOpts, (error$1, entries = []) => {
			callback$1(entries, directoryPath, currentDepth);
			state.queue.dequeue(state.options.suppressErrors ? null : error$1, state);
		});
	};
	const walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
		if (currentDepth < 0) return;
		state.visited.push(crawlPath);
		state.counts.directories++;
		let entries = [];
		try {
			entries = fs_1.default.readdirSync(crawlPath || ".", readdirOpts);
		} catch (e) {
			if (!state.options.suppressErrors) throw e;
		}
		callback$1(entries, directoryPath, currentDepth);
	};
	function build(isSynchronous) {
		return isSynchronous ? walkSync : walkAsync;
	}
	exports.build = build;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/queue.js
var require_queue = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/queue.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Queue = void 0;
	/**
	* This is a custom stateless queue to track concurrent async fs calls.
	* It increments a counter whenever a call is queued and decrements it
	* as soon as it completes. When the counter hits 0, it calls onQueueEmpty.
	*/
	var Queue = class {
		onQueueEmpty;
		count = 0;
		constructor(onQueueEmpty) {
			this.onQueueEmpty = onQueueEmpty;
		}
		enqueue() {
			this.count++;
		}
		dequeue(error$1, output) {
			if (--this.count <= 0 || error$1) this.onQueueEmpty(error$1, output);
		}
	};
	exports.Queue = Queue;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/counter.js
var require_counter = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/counter.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Counter = void 0;
	var Counter = class {
		_files = 0;
		_directories = 0;
		set files(num) {
			this._files = num;
		}
		get files() {
			return this._files;
		}
		set directories(num) {
			this._directories = num;
		}
		get directories() {
			return this._directories;
		}
		/**
		* @deprecated use `directories` instead
		*/
		/* c8 ignore next 3 */
		get dirs() {
			return this._directories;
		}
	};
	exports.Counter = Counter;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/walker.js
var require_walker = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/walker.js"(exports) {
	var __createBinding$1 = void 0 && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar = void 0 && (void 0).__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Walker = void 0;
	const path_1$1 = __require("path");
	const utils_1 = require_utils$1();
	const joinPath = __importStar(require_join_path());
	const pushDirectory = __importStar(require_push_directory());
	const pushFile = __importStar(require_push_file());
	const getArray = __importStar(require_get_array());
	const groupFiles = __importStar(require_group_files());
	const resolveSymlink = __importStar(require_resolve_symlink());
	const invokeCallback = __importStar(require_invoke_callback());
	const walkDirectory = __importStar(require_walk_directory());
	const queue_1 = require_queue();
	const counter_1 = require_counter();
	var Walker = class {
		root;
		isSynchronous;
		state;
		joinPath;
		pushDirectory;
		pushFile;
		getArray;
		groupFiles;
		resolveSymlink;
		walkDirectory;
		callbackInvoker;
		constructor(root, options, callback$1) {
			this.isSynchronous = !callback$1;
			this.callbackInvoker = invokeCallback.build(options, this.isSynchronous);
			this.root = (0, utils_1.normalizePath)(root, options);
			this.state = {
				root: (0, utils_1.isRootDirectory)(this.root) ? this.root : this.root.slice(0, -1),
				paths: [""].slice(0, 0),
				groups: [],
				counts: new counter_1.Counter(),
				options,
				queue: new queue_1.Queue((error$1, state) => this.callbackInvoker(state, error$1, callback$1)),
				symlinks: new Map(),
				visited: [""].slice(0, 0)
			};
			this.joinPath = joinPath.build(this.root, options);
			this.pushDirectory = pushDirectory.build(this.root, options);
			this.pushFile = pushFile.build(options);
			this.getArray = getArray.build(options);
			this.groupFiles = groupFiles.build(options);
			this.resolveSymlink = resolveSymlink.build(options, this.isSynchronous);
			this.walkDirectory = walkDirectory.build(this.isSynchronous);
		}
		start() {
			this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
			return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
		}
		walk = (entries, directoryPath, depth$1) => {
			const { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator } } = this.state;
			if (signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
			this.pushDirectory(directoryPath, paths, filters);
			const files = this.getArray(this.state.paths);
			for (let i = 0; i < entries.length; ++i) {
				const entry = entries[i];
				if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
					const filename = this.joinPath(entry.name, directoryPath);
					this.pushFile(filename, files, this.state.counts, filters);
				} else if (entry.isDirectory()) {
					let path$2 = joinPath.joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
					if (exclude && exclude(entry.name, path$2)) continue;
					this.walkDirectory(this.state, path$2, path$2, depth$1 - 1, this.walk);
				} else if (entry.isSymbolicLink() && this.resolveSymlink) {
					let path$2 = joinPath.joinPathWithBasePath(entry.name, directoryPath);
					this.resolveSymlink(path$2, this.state, (stat, resolvedPath) => {
						if (stat.isDirectory()) {
							resolvedPath = (0, utils_1.normalizePath)(resolvedPath, this.state.options);
							if (exclude && exclude(entry.name, useRealPaths ? resolvedPath : path$2 + pathSeparator)) return;
							this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path$2 + pathSeparator, depth$1 - 1, this.walk);
						} else {
							resolvedPath = useRealPaths ? resolvedPath : path$2;
							const filename = (0, path_1$1.basename)(resolvedPath);
							const directoryPath$1 = (0, utils_1.normalizePath)((0, path_1$1.dirname)(resolvedPath), this.state.options);
							resolvedPath = this.joinPath(filename, directoryPath$1);
							this.pushFile(resolvedPath, files, this.state.counts, filters);
						}
					});
				}
			}
			this.groupFiles(this.state.groups, directoryPath, files);
		};
	};
	exports.Walker = Walker;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/async.js
var require_async = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/async.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.callback = exports.promise = void 0;
	const walker_1$1 = require_walker();
	function promise(root, options) {
		return new Promise((resolve$1, reject) => {
			callback(root, options, (err, output) => {
				if (err) return reject(err);
				resolve$1(output);
			});
		});
	}
	exports.promise = promise;
	function callback(root, options, callback$1) {
		let walker = new walker_1$1.Walker(root, options, callback$1);
		walker.start();
	}
	exports.callback = callback;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/sync.js
var require_sync = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/api/sync.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sync = void 0;
	const walker_1 = require_walker();
	function sync(root, options) {
		const walker = new walker_1.Walker(root, options);
		return walker.start();
	}
	exports.sync = sync;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/builder/api-builder.js
var require_api_builder = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/builder/api-builder.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.APIBuilder = void 0;
	const async_1 = require_async();
	const sync_1 = require_sync();
	var APIBuilder = class {
		root;
		options;
		constructor(root, options) {
			this.root = root;
			this.options = options;
		}
		withPromise() {
			return (0, async_1.promise)(this.root, this.options);
		}
		withCallback(cb) {
			(0, async_1.callback)(this.root, this.options, cb);
		}
		sync() {
			return (0, sync_1.sync)(this.root, this.options);
		}
	};
	exports.APIBuilder = APIBuilder;
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/constants.js"(exports, module) {
	const WIN_SLASH = "\\\\/";
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
	/**
	* Posix glob regex
	*/
	const DOT_LITERAL = "\\.";
	const PLUS_LITERAL = "\\+";
	const QMARK_LITERAL = "\\?";
	const SLASH_LITERAL = "\\/";
	const ONE_CHAR = "(?=.)";
	const QMARK = "[^/]";
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;
	const SEP = "/";
	const POSIX_CHARS = {
		DOT_LITERAL,
		PLUS_LITERAL,
		QMARK_LITERAL,
		SLASH_LITERAL,
		ONE_CHAR,
		QMARK,
		END_ANCHOR,
		DOTS_SLASH,
		NO_DOT,
		NO_DOTS,
		NO_DOT_SLASH,
		NO_DOTS_SLASH,
		QMARK_NO_DOT,
		STAR,
		START_ANCHOR,
		SEP
	};
	/**
	* Windows glob regex
	*/
	const WINDOWS_CHARS = {
		...POSIX_CHARS,
		SLASH_LITERAL: `[${WIN_SLASH}]`,
		QMARK: WIN_NO_SLASH,
		STAR: `${WIN_NO_SLASH}*?`,
		DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
		NO_DOT: `(?!${DOT_LITERAL})`,
		NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
		NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
		QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
		START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
		END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
		SEP: "\\"
	};
	/**
	* POSIX Bracket Regex
	*/
	const POSIX_REGEX_SOURCE$1 = {
		alnum: "a-zA-Z0-9",
		alpha: "a-zA-Z",
		ascii: "\\x00-\\x7F",
		blank: " \\t",
		cntrl: "\\x00-\\x1F\\x7F",
		digit: "0-9",
		graph: "\\x21-\\x7E",
		lower: "a-z",
		print: "\\x20-\\x7E ",
		punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
		space: " \\t\\r\\n\\v\\f",
		upper: "A-Z",
		word: "A-Za-z0-9_",
		xdigit: "A-Fa-f0-9"
	};
	module.exports = {
		MAX_LENGTH: 1024 * 64,
		POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
		REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
		REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
		REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
		REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
		REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
		REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
		REPLACEMENTS: {
			"***": "*",
			"**/**": "**",
			"**/**/**": "**"
		},
		CHAR_0: 48,
		CHAR_9: 57,
		CHAR_UPPERCASE_A: 65,
		CHAR_LOWERCASE_A: 97,
		CHAR_UPPERCASE_Z: 90,
		CHAR_LOWERCASE_Z: 122,
		CHAR_LEFT_PARENTHESES: 40,
		CHAR_RIGHT_PARENTHESES: 41,
		CHAR_ASTERISK: 42,
		CHAR_AMPERSAND: 38,
		CHAR_AT: 64,
		CHAR_BACKWARD_SLASH: 92,
		CHAR_CARRIAGE_RETURN: 13,
		CHAR_CIRCUMFLEX_ACCENT: 94,
		CHAR_COLON: 58,
		CHAR_COMMA: 44,
		CHAR_DOT: 46,
		CHAR_DOUBLE_QUOTE: 34,
		CHAR_EQUAL: 61,
		CHAR_EXCLAMATION_MARK: 33,
		CHAR_FORM_FEED: 12,
		CHAR_FORWARD_SLASH: 47,
		CHAR_GRAVE_ACCENT: 96,
		CHAR_HASH: 35,
		CHAR_HYPHEN_MINUS: 45,
		CHAR_LEFT_ANGLE_BRACKET: 60,
		CHAR_LEFT_CURLY_BRACE: 123,
		CHAR_LEFT_SQUARE_BRACKET: 91,
		CHAR_LINE_FEED: 10,
		CHAR_NO_BREAK_SPACE: 160,
		CHAR_PERCENT: 37,
		CHAR_PLUS: 43,
		CHAR_QUESTION_MARK: 63,
		CHAR_RIGHT_ANGLE_BRACKET: 62,
		CHAR_RIGHT_CURLY_BRACE: 125,
		CHAR_RIGHT_SQUARE_BRACKET: 93,
		CHAR_SEMICOLON: 59,
		CHAR_SINGLE_QUOTE: 39,
		CHAR_SPACE: 32,
		CHAR_TAB: 9,
		CHAR_UNDERSCORE: 95,
		CHAR_VERTICAL_LINE: 124,
		CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
		extglobChars(chars) {
			return {
				"!": {
					type: "negate",
					open: "(?:(?!(?:",
					close: `))${chars.STAR})`
				},
				"?": {
					type: "qmark",
					open: "(?:",
					close: ")?"
				},
				"+": {
					type: "plus",
					open: "(?:",
					close: ")+"
				},
				"*": {
					type: "star",
					open: "(?:",
					close: ")*"
				},
				"@": {
					type: "at",
					open: "(?:",
					close: ")"
				}
			};
		},
		globChars(win32) {
			return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
		}
	};
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/utils.js"(exports) {
	const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH, REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL } = require_constants();
	exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
	exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
	exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
	exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
	exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
	exports.isWindows = () => {
		if (typeof navigator !== "undefined" && navigator.platform) {
			const platform = navigator.platform.toLowerCase();
			return platform === "win32" || platform === "windows";
		}
		if (typeof process !== "undefined" && process.platform) return process.platform === "win32";
		return false;
	};
	exports.removeBackslashes = (str) => {
		return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
			return match === "\\" ? "" : match;
		});
	};
	exports.escapeLast = (input, char, lastIdx) => {
		const idx = input.lastIndexOf(char, lastIdx);
		if (idx === -1) return input;
		if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
		return `${input.slice(0, idx)}\\${input.slice(idx)}`;
	};
	exports.removePrefix = (input, state = {}) => {
		let output = input;
		if (output.startsWith("./")) {
			output = output.slice(2);
			state.prefix = "./";
		}
		return output;
	};
	exports.wrapOutput = (input, state = {}, options = {}) => {
		const prepend = options.contains ? "" : "^";
		const append = options.contains ? "" : "$";
		let output = `${prepend}(?:${input})${append}`;
		if (state.negated === true) output = `(?:^(?!${output}).*$)`;
		return output;
	};
	exports.basename = (path$2, { windows } = {}) => {
		const segs = path$2.split(windows ? /[\\/]/ : "/");
		const last = segs[segs.length - 1];
		if (last === "") return segs[segs.length - 2];
		return last;
	};
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/scan.js"(exports, module) {
	const utils$3 = require_utils();
	const { CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET } = require_constants();
	const isPathSeparator = (code) => {
		return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};
	const depth = (token) => {
		if (token.isPrefix !== true) token.depth = token.isGlobstar ? Infinity : 1;
	};
	/**
	* Quickly scans a glob pattern and returns an object with a handful of
	* useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	* `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	* with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	*
	* ```js
	* const pm = require('picomatch');
	* console.log(pm.scan('foo/bar/*.js'));
	* { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	* ```
	* @param {String} `str`
	* @param {Object} `options`
	* @return {Object} Returns an object with tokens and regex source string.
	* @api public
	*/
	const scan$1 = (input, options) => {
		const opts = options || {};
		const length = input.length - 1;
		const scanToEnd = opts.parts === true || opts.scanToEnd === true;
		const slashes = [];
		const tokens = [];
		const parts = [];
		let str = input;
		let index = -1;
		let start = 0;
		let lastIndex = 0;
		let isBrace = false;
		let isBracket = false;
		let isGlob = false;
		let isExtglob = false;
		let isGlobstar = false;
		let braceEscaped = false;
		let backslashes = false;
		let negated = false;
		let negatedExtglob = false;
		let finished = false;
		let braces = 0;
		let prev;
		let code;
		let token = {
			value: "",
			depth: 0,
			isGlob: false
		};
		const eos = () => index >= length;
		const peek = () => str.charCodeAt(index + 1);
		const advance = () => {
			prev = code;
			return str.charCodeAt(++index);
		};
		while (index < length) {
			code = advance();
			let next;
			if (code === CHAR_BACKWARD_SLASH) {
				backslashes = token.backslashes = true;
				code = advance();
				if (code === CHAR_LEFT_CURLY_BRACE) braceEscaped = true;
				continue;
			}
			if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
				braces++;
				while (eos() !== true && (code = advance())) {
					if (code === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (code === CHAR_LEFT_CURLY_BRACE) {
						braces++;
						continue;
					}
					if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (braceEscaped !== true && code === CHAR_COMMA) {
						isBrace = token.isBrace = true;
						isGlob = token.isGlob = true;
						finished = true;
						if (scanToEnd === true) continue;
						break;
					}
					if (code === CHAR_RIGHT_CURLY_BRACE) {
						braces--;
						if (braces === 0) {
							braceEscaped = false;
							isBrace = token.isBrace = true;
							finished = true;
							break;
						}
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_FORWARD_SLASH) {
				slashes.push(index);
				tokens.push(token);
				token = {
					value: "",
					depth: 0,
					isGlob: false
				};
				if (finished === true) continue;
				if (prev === CHAR_DOT && index === start + 1) {
					start += 2;
					continue;
				}
				lastIndex = index + 1;
				continue;
			}
			if (opts.noext !== true) {
				const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
				if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
					isGlob = token.isGlob = true;
					isExtglob = token.isExtglob = true;
					finished = true;
					if (code === CHAR_EXCLAMATION_MARK && index === start) negatedExtglob = true;
					if (scanToEnd === true) {
						while (eos() !== true && (code = advance())) {
							if (code === CHAR_BACKWARD_SLASH) {
								backslashes = token.backslashes = true;
								code = advance();
								continue;
							}
							if (code === CHAR_RIGHT_PARENTHESES) {
								isGlob = token.isGlob = true;
								finished = true;
								break;
							}
						}
						continue;
					}
					break;
				}
			}
			if (code === CHAR_ASTERISK) {
				if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_QUESTION_MARK) {
				isGlob = token.isGlob = true;
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
			if (code === CHAR_LEFT_SQUARE_BRACKET) {
				while (eos() !== true && (next = advance())) {
					if (next === CHAR_BACKWARD_SLASH) {
						backslashes = token.backslashes = true;
						advance();
						continue;
					}
					if (next === CHAR_RIGHT_SQUARE_BRACKET) {
						isBracket = token.isBracket = true;
						isGlob = token.isGlob = true;
						finished = true;
						break;
					}
				}
				if (scanToEnd === true) continue;
				break;
			}
			if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
				negated = token.negated = true;
				start++;
				continue;
			}
			if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
				isGlob = token.isGlob = true;
				if (scanToEnd === true) {
					while (eos() !== true && (code = advance())) {
						if (code === CHAR_LEFT_PARENTHESES) {
							backslashes = token.backslashes = true;
							code = advance();
							continue;
						}
						if (code === CHAR_RIGHT_PARENTHESES) {
							finished = true;
							break;
						}
					}
					continue;
				}
				break;
			}
			if (isGlob === true) {
				finished = true;
				if (scanToEnd === true) continue;
				break;
			}
		}
		if (opts.noext === true) {
			isExtglob = false;
			isGlob = false;
		}
		let base = str;
		let prefix = "";
		let glob$1 = "";
		if (start > 0) {
			prefix = str.slice(0, start);
			str = str.slice(start);
			lastIndex -= start;
		}
		if (base && isGlob === true && lastIndex > 0) {
			base = str.slice(0, lastIndex);
			glob$1 = str.slice(lastIndex);
		} else if (isGlob === true) {
			base = "";
			glob$1 = str;
		} else base = str;
		if (base && base !== "" && base !== "/" && base !== str) {
			if (isPathSeparator(base.charCodeAt(base.length - 1))) base = base.slice(0, -1);
		}
		if (opts.unescape === true) {
			if (glob$1) glob$1 = utils$3.removeBackslashes(glob$1);
			if (base && backslashes === true) base = utils$3.removeBackslashes(base);
		}
		const state = {
			prefix,
			input,
			start,
			base,
			glob: glob$1,
			isBrace,
			isBracket,
			isGlob,
			isExtglob,
			isGlobstar,
			negated,
			negatedExtglob
		};
		if (opts.tokens === true) {
			state.maxDepth = 0;
			if (!isPathSeparator(code)) tokens.push(token);
			state.tokens = tokens;
		}
		if (opts.parts === true || opts.tokens === true) {
			let prevIndex;
			for (let idx = 0; idx < slashes.length; idx++) {
				const n = prevIndex ? prevIndex + 1 : start;
				const i = slashes[idx];
				const value = input.slice(n, i);
				if (opts.tokens) {
					if (idx === 0 && start !== 0) {
						tokens[idx].isPrefix = true;
						tokens[idx].value = prefix;
					} else tokens[idx].value = value;
					depth(tokens[idx]);
					state.maxDepth += tokens[idx].depth;
				}
				if (idx !== 0 || value !== "") parts.push(value);
				prevIndex = i;
			}
			if (prevIndex && prevIndex + 1 < input.length) {
				const value = input.slice(prevIndex + 1);
				parts.push(value);
				if (opts.tokens) {
					tokens[tokens.length - 1].value = value;
					depth(tokens[tokens.length - 1]);
					state.maxDepth += tokens[tokens.length - 1].depth;
				}
			}
			state.slashes = slashes;
			state.parts = parts;
		}
		return state;
	};
	module.exports = scan$1;
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/parse.js"(exports, module) {
	const constants$1 = require_constants();
	const utils$2 = require_utils();
	/**
	* Constants
	*/
	const { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants$1;
	/**
	* Helpers
	*/
	const expandRange = (args, options) => {
		if (typeof options.expandRange === "function") return options.expandRange(...args, options);
		args.sort();
		const value = `[${args.join("-")}]`;
		try {
			new RegExp(value);
		} catch (ex) {
			return args.map((v) => utils$2.escapeRegex(v)).join("..");
		}
		return value;
	};
	/**
	* Create the message for a syntax error
	*/
	const syntaxError = (type, char) => {
		return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};
	/**
	* Parse the given input string.
	* @param {String} input
	* @param {Object} options
	* @return {Object}
	*/
	const parse$1 = (input, options) => {
		if (typeof input !== "string") throw new TypeError("Expected a string");
		input = REPLACEMENTS[input] || input;
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		let len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		const bos = {
			type: "bos",
			value: "",
			output: opts.prepend || ""
		};
		const tokens = [bos];
		const capture = opts.capture ? "" : "?:";
		const PLATFORM_CHARS = constants$1.globChars(opts.windows);
		const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);
		const { DOT_LITERAL: DOT_LITERAL$1, PLUS_LITERAL: PLUS_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT: NO_DOT$1, NO_DOT_SLASH: NO_DOT_SLASH$1, NO_DOTS_SLASH: NO_DOTS_SLASH$1, QMARK: QMARK$1, QMARK_NO_DOT: QMARK_NO_DOT$1, STAR: STAR$1, START_ANCHOR: START_ANCHOR$1 } = PLATFORM_CHARS;
		const globstar = (opts$1) => {
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const nodot = opts.dot ? "" : NO_DOT$1;
		const qmarkNoDot = opts.dot ? QMARK$1 : QMARK_NO_DOT$1;
		let star = opts.bash === true ? globstar(opts) : STAR$1;
		if (opts.capture) star = `(${star})`;
		if (typeof opts.noext === "boolean") opts.noextglob = opts.noext;
		const state = {
			input,
			index: -1,
			start: 0,
			dot: opts.dot === true,
			consumed: "",
			output: "",
			prefix: "",
			backtrack: false,
			negated: false,
			brackets: 0,
			braces: 0,
			parens: 0,
			quotes: 0,
			globstar: false,
			tokens
		};
		input = utils$2.removePrefix(input, state);
		len = input.length;
		const extglobs = [];
		const braces = [];
		const stack = [];
		let prev = bos;
		let value;
		/**
		* Tokenizing helpers
		*/
		const eos = () => state.index === len - 1;
		const peek = state.peek = (n = 1) => input[state.index + n];
		const advance = state.advance = () => input[++state.index] || "";
		const remaining = () => input.slice(state.index + 1);
		const consume = (value$1 = "", num = 0) => {
			state.consumed += value$1;
			state.index += num;
		};
		const append = (token) => {
			state.output += token.output != null ? token.output : token.value;
			consume(token.value);
		};
		const negate = () => {
			let count = 1;
			while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
				advance();
				state.start++;
				count++;
			}
			if (count % 2 === 0) return false;
			state.negated = true;
			state.start++;
			return true;
		};
		const increment = (type) => {
			state[type]++;
			stack.push(type);
		};
		const decrement = (type) => {
			state[type]--;
			stack.pop();
		};
		/**
		* Push tokens onto the tokens array. This helper speeds up
		* tokenizing by 1) helping us avoid backtracking as much as possible,
		* and 2) helping us avoid creating extra tokens when consecutive
		* characters are plain text. This improves performance and simplifies
		* lookbehinds.
		*/
		const push = (tok) => {
			if (prev.type === "globstar") {
				const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
				const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
				if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
					state.output = state.output.slice(0, -prev.output.length);
					prev.type = "star";
					prev.value = "*";
					prev.output = star;
					state.output += prev.output;
				}
			}
			if (extglobs.length && tok.type !== "paren") extglobs[extglobs.length - 1].inner += tok.value;
			if (tok.value || tok.output) append(tok);
			if (prev && prev.type === "text" && tok.type === "text") {
				prev.output = (prev.output || prev.value) + tok.value;
				prev.value += tok.value;
				return;
			}
			tok.prev = prev;
			tokens.push(tok);
			prev = tok;
		};
		const extglobOpen = (type, value$1) => {
			const token = {
				...EXTGLOB_CHARS[value$1],
				conditions: 1,
				inner: ""
			};
			token.prev = prev;
			token.parens = state.parens;
			token.output = state.output;
			const output = (opts.capture ? "(" : "") + token.open;
			increment("parens");
			push({
				type,
				value: value$1,
				output: state.output ? "" : ONE_CHAR$1
			});
			push({
				type: "paren",
				extglob: true,
				value: advance(),
				output
			});
			extglobs.push(token);
		};
		const extglobClose = (token) => {
			let output = token.close + (opts.capture ? ")" : "");
			let rest;
			if (token.type === "negate") {
				let extglobStar = star;
				if (token.inner && token.inner.length > 1 && token.inner.includes("/")) extglobStar = globstar(opts);
				if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) output = token.close = `)$))${extglobStar}`;
				if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
					const expression = parse$1(rest, {
						...options,
						fastpaths: false
					}).output;
					output = token.close = `)${expression})${extglobStar})`;
				}
				if (token.prev.type === "bos") state.negatedExtglob = true;
			}
			push({
				type: "paren",
				extglob: true,
				value,
				output
			});
			decrement("parens");
		};
		/**
		* Fast paths
		*/
		if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
			let backslashes = false;
			let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
				if (first === "\\") {
					backslashes = true;
					return m;
				}
				if (first === "?") {
					if (esc) return esc + first + (rest ? QMARK$1.repeat(rest.length) : "");
					if (index === 0) return qmarkNoDot + (rest ? QMARK$1.repeat(rest.length) : "");
					return QMARK$1.repeat(chars.length);
				}
				if (first === ".") return DOT_LITERAL$1.repeat(chars.length);
				if (first === "*") {
					if (esc) return esc + first + (rest ? star : "");
					return star;
				}
				return esc ? m : `\\${m}`;
			});
			if (backslashes === true) if (opts.unescape === true) output = output.replace(/\\/g, "");
			else output = output.replace(/\\+/g, (m) => {
				return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
			});
			if (output === input && opts.contains === true) {
				state.output = input;
				return state;
			}
			state.output = utils$2.wrapOutput(output, state, options);
			return state;
		}
		/**
		* Tokenize input until we reach end-of-string
		*/
		while (!eos()) {
			value = advance();
			if (value === "\0") continue;
			/**
			* Escaped characters
			*/
			if (value === "\\") {
				const next = peek();
				if (next === "/" && opts.bash !== true) continue;
				if (next === "." || next === ";") continue;
				if (!next) {
					value += "\\";
					push({
						type: "text",
						value
					});
					continue;
				}
				const match = /^\\+/.exec(remaining());
				let slashes = 0;
				if (match && match[0].length > 2) {
					slashes = match[0].length;
					state.index += slashes;
					if (slashes % 2 !== 0) value += "\\";
				}
				if (opts.unescape === true) value = advance();
				else value += advance();
				if (state.brackets === 0) {
					push({
						type: "text",
						value
					});
					continue;
				}
			}
			/**
			* If we're inside a regex character class, continue
			* until we reach the closing bracket.
			*/
			if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
				if (opts.posix !== false && value === ":") {
					const inner = prev.value.slice(1);
					if (inner.includes("[")) {
						prev.posix = true;
						if (inner.includes(":")) {
							const idx = prev.value.lastIndexOf("[");
							const pre = prev.value.slice(0, idx);
							const rest$1 = prev.value.slice(idx + 2);
							const posix$1 = POSIX_REGEX_SOURCE[rest$1];
							if (posix$1) {
								prev.value = pre + posix$1;
								state.backtrack = true;
								advance();
								if (!bos.output && tokens.indexOf(prev) === 1) bos.output = ONE_CHAR$1;
								continue;
							}
						}
					}
				}
				if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") value = `\\${value}`;
				if (value === "]" && (prev.value === "[" || prev.value === "[^")) value = `\\${value}`;
				if (opts.posix === true && value === "!" && prev.value === "[") value = "^";
				prev.value += value;
				append({ value });
				continue;
			}
			/**
			* If we're inside a quoted string, continue
			* until we reach the closing double quote.
			*/
			if (state.quotes === 1 && value !== "\"") {
				value = utils$2.escapeRegex(value);
				prev.value += value;
				append({ value });
				continue;
			}
			/**
			* Double quotes
			*/
			if (value === "\"") {
				state.quotes = state.quotes === 1 ? 0 : 1;
				if (opts.keepQuotes === true) push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Parentheses
			*/
			if (value === "(") {
				increment("parens");
				push({
					type: "paren",
					value
				});
				continue;
			}
			if (value === ")") {
				if (state.parens === 0 && opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "("));
				const extglob = extglobs[extglobs.length - 1];
				if (extglob && state.parens === extglob.parens + 1) {
					extglobClose(extglobs.pop());
					continue;
				}
				push({
					type: "paren",
					value,
					output: state.parens ? ")" : "\\)"
				});
				decrement("parens");
				continue;
			}
			/**
			* Square brackets
			*/
			if (value === "[") {
				if (opts.nobracket === true || !remaining().includes("]")) {
					if (opts.nobracket !== true && opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
					value = `\\${value}`;
				} else increment("brackets");
				push({
					type: "bracket",
					value
				});
				continue;
			}
			if (value === "]") {
				if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				if (state.brackets === 0) {
					if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("opening", "["));
					push({
						type: "text",
						value,
						output: `\\${value}`
					});
					continue;
				}
				decrement("brackets");
				const prevValue = prev.value.slice(1);
				if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) value = `/${value}`;
				prev.value += value;
				append({ value });
				if (opts.literalBrackets === false || utils$2.hasRegexChars(prevValue)) continue;
				const escaped = utils$2.escapeRegex(prev.value);
				state.output = state.output.slice(0, -prev.value.length);
				if (opts.literalBrackets === true) {
					state.output += escaped;
					prev.value = escaped;
					continue;
				}
				prev.value = `(${capture}${escaped}|${prev.value})`;
				state.output += prev.value;
				continue;
			}
			/**
			* Braces
			*/
			if (value === "{" && opts.nobrace !== true) {
				increment("braces");
				const open = {
					type: "brace",
					value,
					output: "(",
					outputIndex: state.output.length,
					tokensIndex: state.tokens.length
				};
				braces.push(open);
				push(open);
				continue;
			}
			if (value === "}") {
				const brace = braces[braces.length - 1];
				if (opts.nobrace === true || !brace) {
					push({
						type: "text",
						value,
						output: value
					});
					continue;
				}
				let output = ")";
				if (brace.dots === true) {
					const arr = tokens.slice();
					const range = [];
					for (let i = arr.length - 1; i >= 0; i--) {
						tokens.pop();
						if (arr[i].type === "brace") break;
						if (arr[i].type !== "dots") range.unshift(arr[i].value);
					}
					output = expandRange(range, opts);
					state.backtrack = true;
				}
				if (brace.comma !== true && brace.dots !== true) {
					const out = state.output.slice(0, brace.outputIndex);
					const toks = state.tokens.slice(brace.tokensIndex);
					brace.value = brace.output = "\\{";
					value = output = "\\}";
					state.output = out;
					for (const t of toks) state.output += t.output || t.value;
				}
				push({
					type: "brace",
					value,
					output
				});
				decrement("braces");
				braces.pop();
				continue;
			}
			/**
			* Pipes
			*/
			if (value === "|") {
				if (extglobs.length > 0) extglobs[extglobs.length - 1].conditions++;
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Commas
			*/
			if (value === ",") {
				let output = value;
				const brace = braces[braces.length - 1];
				if (brace && stack[stack.length - 1] === "braces") {
					brace.comma = true;
					output = "|";
				}
				push({
					type: "comma",
					value,
					output
				});
				continue;
			}
			/**
			* Slashes
			*/
			if (value === "/") {
				if (prev.type === "dot" && state.index === state.start + 1) {
					state.start = state.index + 1;
					state.consumed = "";
					state.output = "";
					tokens.pop();
					prev = bos;
					continue;
				}
				push({
					type: "slash",
					value,
					output: SLASH_LITERAL$1
				});
				continue;
			}
			/**
			* Dots
			*/
			if (value === ".") {
				if (state.braces > 0 && prev.type === "dot") {
					if (prev.value === ".") prev.output = DOT_LITERAL$1;
					const brace = braces[braces.length - 1];
					prev.type = "dots";
					prev.output += value;
					prev.value += value;
					brace.dots = true;
					continue;
				}
				if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
					push({
						type: "text",
						value,
						output: DOT_LITERAL$1
					});
					continue;
				}
				push({
					type: "dot",
					value,
					output: DOT_LITERAL$1
				});
				continue;
			}
			/**
			* Question marks
			*/
			if (value === "?") {
				const isGroup = prev && prev.value === "(";
				if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("qmark", value);
					continue;
				}
				if (prev && prev.type === "paren") {
					const next = peek();
					let output = value;
					if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) output = `\\${value}`;
					push({
						type: "text",
						value,
						output
					});
					continue;
				}
				if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
					push({
						type: "qmark",
						value,
						output: QMARK_NO_DOT$1
					});
					continue;
				}
				push({
					type: "qmark",
					value,
					output: QMARK$1
				});
				continue;
			}
			/**
			* Exclamation
			*/
			if (value === "!") {
				if (opts.noextglob !== true && peek() === "(") {
					if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
						extglobOpen("negate", value);
						continue;
					}
				}
				if (opts.nonegate !== true && state.index === 0) {
					negate();
					continue;
				}
			}
			/**
			* Plus
			*/
			if (value === "+") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					extglobOpen("plus", value);
					continue;
				}
				if (prev && prev.value === "(" || opts.regex === false) {
					push({
						type: "plus",
						value,
						output: PLUS_LITERAL$1
					});
					continue;
				}
				if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
					push({
						type: "plus",
						value
					});
					continue;
				}
				push({
					type: "plus",
					value: PLUS_LITERAL$1
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value === "@") {
				if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
					push({
						type: "at",
						extglob: true,
						value,
						output: ""
					});
					continue;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Plain text
			*/
			if (value !== "*") {
				if (value === "$" || value === "^") value = `\\${value}`;
				const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
				if (match) {
					value += match[0];
					state.index += match[0].length;
				}
				push({
					type: "text",
					value
				});
				continue;
			}
			/**
			* Stars
			*/
			if (prev && (prev.type === "globstar" || prev.star === true)) {
				prev.type = "star";
				prev.star = true;
				prev.value += value;
				prev.output = star;
				state.backtrack = true;
				state.globstar = true;
				consume(value);
				continue;
			}
			let rest = remaining();
			if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
				extglobOpen("star", value);
				continue;
			}
			if (prev.type === "star") {
				if (opts.noglobstar === true) {
					consume(value);
					continue;
				}
				const prior = prev.prev;
				const before = prior.prev;
				const isStart = prior.type === "slash" || prior.type === "bos";
				const afterStar = before && (before.type === "star" || before.type === "globstar");
				if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
				const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
				if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
					push({
						type: "star",
						value,
						output: ""
					});
					continue;
				}
				while (rest.slice(0, 3) === "/**") {
					const after = input[state.index + 4];
					if (after && after !== "/") break;
					rest = rest.slice(3);
					consume("/**", 3);
				}
				if (prior.type === "bos" && eos()) {
					prev.type = "globstar";
					prev.value += value;
					prev.output = globstar(opts);
					state.output = prev.output;
					state.globstar = true;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
					prev.value += value;
					state.globstar = true;
					state.output += prior.output + prev.output;
					consume(value);
					continue;
				}
				if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
					const end = rest[1] !== void 0 ? "|$" : "";
					state.output = state.output.slice(0, -(prior.output + prev.output).length);
					prior.output = `(?:${prior.output}`;
					prev.type = "globstar";
					prev.output = `${globstar(opts)}${SLASH_LITERAL$1}|${SLASH_LITERAL$1}${end})`;
					prev.value += value;
					state.output += prior.output + prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				if (prior.type === "bos" && rest[0] === "/") {
					prev.type = "globstar";
					prev.value += value;
					prev.output = `(?:^|${SLASH_LITERAL$1}|${globstar(opts)}${SLASH_LITERAL$1})`;
					state.output = prev.output;
					state.globstar = true;
					consume(value + advance());
					push({
						type: "slash",
						value: "/",
						output: ""
					});
					continue;
				}
				state.output = state.output.slice(0, -prev.output.length);
				prev.type = "globstar";
				prev.output = globstar(opts);
				prev.value += value;
				state.output += prev.output;
				state.globstar = true;
				consume(value);
				continue;
			}
			const token = {
				type: "star",
				value,
				output: star
			};
			if (opts.bash === true) {
				token.output = ".*?";
				if (prev.type === "bos" || prev.type === "slash") token.output = nodot + token.output;
				push(token);
				continue;
			}
			if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
				token.output = value;
				push(token);
				continue;
			}
			if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
				if (prev.type === "dot") {
					state.output += NO_DOT_SLASH$1;
					prev.output += NO_DOT_SLASH$1;
				} else if (opts.dot === true) {
					state.output += NO_DOTS_SLASH$1;
					prev.output += NO_DOTS_SLASH$1;
				} else {
					state.output += nodot;
					prev.output += nodot;
				}
				if (peek() !== "*") {
					state.output += ONE_CHAR$1;
					prev.output += ONE_CHAR$1;
				}
			}
			push(token);
		}
		while (state.brackets > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
			state.output = utils$2.escapeLast(state.output, "[");
			decrement("brackets");
		}
		while (state.parens > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
			state.output = utils$2.escapeLast(state.output, "(");
			decrement("parens");
		}
		while (state.braces > 0) {
			if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
			state.output = utils$2.escapeLast(state.output, "{");
			decrement("braces");
		}
		if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) push({
			type: "maybe_slash",
			value: "",
			output: `${SLASH_LITERAL$1}?`
		});
		if (state.backtrack === true) {
			state.output = "";
			for (const token of state.tokens) {
				state.output += token.output != null ? token.output : token.value;
				if (token.suffix) state.output += token.suffix;
			}
		}
		return state;
	};
	/**
	* Fast paths for creating regular expressions for common glob patterns.
	* This can significantly speed up processing and has very little downside
	* impact when none of the fast paths match.
	*/
	parse$1.fastpaths = (input, options) => {
		const opts = { ...options };
		const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
		const len = input.length;
		if (len > max) throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
		input = REPLACEMENTS[input] || input;
		const { DOT_LITERAL: DOT_LITERAL$1, SLASH_LITERAL: SLASH_LITERAL$1, ONE_CHAR: ONE_CHAR$1, DOTS_SLASH: DOTS_SLASH$1, NO_DOT: NO_DOT$1, NO_DOTS: NO_DOTS$1, NO_DOTS_SLASH: NO_DOTS_SLASH$1, STAR: STAR$1, START_ANCHOR: START_ANCHOR$1 } = constants$1.globChars(opts.windows);
		const nodot = opts.dot ? NO_DOTS$1 : NO_DOT$1;
		const slashDot = opts.dot ? NO_DOTS_SLASH$1 : NO_DOT$1;
		const capture = opts.capture ? "" : "?:";
		const state = {
			negated: false,
			prefix: ""
		};
		let star = opts.bash === true ? ".*?" : STAR$1;
		if (opts.capture) star = `(${star})`;
		const globstar = (opts$1) => {
			if (opts$1.noglobstar === true) return star;
			return `(${capture}(?:(?!${START_ANCHOR$1}${opts$1.dot ? DOTS_SLASH$1 : DOT_LITERAL$1}).)*?)`;
		};
		const create = (str) => {
			switch (str) {
				case "*": return `${nodot}${ONE_CHAR$1}${star}`;
				case ".*": return `${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*.*": return `${nodot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "*/*": return `${nodot}${star}${SLASH_LITERAL$1}${ONE_CHAR$1}${slashDot}${star}`;
				case "**": return nodot + globstar(opts);
				case "**/*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${ONE_CHAR$1}${star}`;
				case "**/*.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${slashDot}${star}${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				case "**/.*": return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL$1})?${DOT_LITERAL$1}${ONE_CHAR$1}${star}`;
				default: {
					const match = /^(.*?)\.(\w+)$/.exec(str);
					if (!match) return;
					const source$1 = create(match[1]);
					if (!source$1) return;
					return source$1 + DOT_LITERAL$1 + match[2];
				}
			}
		};
		const output = utils$2.removePrefix(input, state);
		let source = create(output);
		if (source && opts.strictSlashes !== true) source += `${SLASH_LITERAL$1}?`;
		return source;
	};
	module.exports = parse$1;
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/picomatch.js
var require_picomatch$1 = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/lib/picomatch.js"(exports, module) {
	const scan = require_scan();
	const parse = require_parse();
	const utils$1 = require_utils();
	const constants = require_constants();
	const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
	/**
	* Creates a matcher function from one or more glob patterns. The
	* returned function takes a string to match as its first argument,
	* and returns true if the string is a match. The returned matcher
	* function also takes a boolean as the second argument that, when true,
	* returns an object with additional information.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch(glob[, options]);
	*
	* const isMatch = picomatch('*.!(*a)');
	* console.log(isMatch('a.a')); //=> false
	* console.log(isMatch('a.b')); //=> true
	* ```
	* @name picomatch
	* @param {String|Array} `globs` One or more glob patterns.
	* @param {Object=} `options`
	* @return {Function=} Returns a matcher function.
	* @api public
	*/
	const picomatch$2 = (glob$1, options, returnState = false) => {
		if (Array.isArray(glob$1)) {
			const fns = glob$1.map((input) => picomatch$2(input, options, returnState));
			const arrayMatcher = (str) => {
				for (const isMatch of fns) {
					const state$1 = isMatch(str);
					if (state$1) return state$1;
				}
				return false;
			};
			return arrayMatcher;
		}
		const isState = isObject(glob$1) && glob$1.tokens && glob$1.input;
		if (glob$1 === "" || typeof glob$1 !== "string" && !isState) throw new TypeError("Expected pattern to be a non-empty string");
		const opts = options || {};
		const posix$1 = opts.windows;
		const regex = isState ? picomatch$2.compileRe(glob$1, options) : picomatch$2.makeRe(glob$1, options, false, true);
		const state = regex.state;
		delete regex.state;
		let isIgnored = () => false;
		if (opts.ignore) {
			const ignoreOpts = {
				...options,
				ignore: null,
				onMatch: null,
				onResult: null
			};
			isIgnored = picomatch$2(opts.ignore, ignoreOpts, returnState);
		}
		const matcher = (input, returnObject = false) => {
			const { isMatch, match, output } = picomatch$2.test(input, regex, options, {
				glob: glob$1,
				posix: posix$1
			});
			const result = {
				glob: glob$1,
				state,
				regex,
				posix: posix$1,
				input,
				output,
				match,
				isMatch
			};
			if (typeof opts.onResult === "function") opts.onResult(result);
			if (isMatch === false) {
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (isIgnored(input)) {
				if (typeof opts.onIgnore === "function") opts.onIgnore(result);
				result.isMatch = false;
				return returnObject ? result : false;
			}
			if (typeof opts.onMatch === "function") opts.onMatch(result);
			return returnObject ? result : true;
		};
		if (returnState) matcher.state = state;
		return matcher;
	};
	/**
	* Test `input` with the given `regex`. This is used by the main
	* `picomatch()` function to test the input string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.test(input, regex[, options]);
	*
	* console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	* // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp} `regex`
	* @return {Object} Returns an object with matching info.
	* @api public
	*/
	picomatch$2.test = (input, regex, options, { glob: glob$1, posix: posix$1 } = {}) => {
		if (typeof input !== "string") throw new TypeError("Expected input to be a string");
		if (input === "") return {
			isMatch: false,
			output: ""
		};
		const opts = options || {};
		const format = opts.format || (posix$1 ? utils$1.toPosixSlashes : null);
		let match = input === glob$1;
		let output = match && format ? format(input) : input;
		if (match === false) {
			output = format ? format(input) : input;
			match = output === glob$1;
		}
		if (match === false || opts.capture === true) if (opts.matchBase === true || opts.basename === true) match = picomatch$2.matchBase(input, regex, options, posix$1);
		else match = regex.exec(output);
		return {
			isMatch: Boolean(match),
			match,
			output
		};
	};
	/**
	* Match the basename of a filepath.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.matchBase(input, glob[, options]);
	* console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	* ```
	* @param {String} `input` String to test.
	* @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	* @return {Boolean}
	* @api public
	*/
	picomatch$2.matchBase = (input, glob$1, options) => {
		const regex = glob$1 instanceof RegExp ? glob$1 : picomatch$2.makeRe(glob$1, options);
		return regex.test(utils$1.basename(input));
	};
	/**
	* Returns true if **any** of the given glob `patterns` match the specified `string`.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.isMatch(string, patterns[, options]);
	*
	* console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	* console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	* ```
	* @param {String|Array} str The string to test.
	* @param {String|Array} patterns One or more glob patterns to use for matching.
	* @param {Object} [options] See available [options](#options).
	* @return {Boolean} Returns true if any patterns match `str`
	* @api public
	*/
	picomatch$2.isMatch = (str, patterns, options) => picomatch$2(patterns, options)(str);
	/**
	* Parse a glob pattern to create the source string for a regular
	* expression.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const result = picomatch.parse(pattern[, options]);
	* ```
	* @param {String} `pattern`
	* @param {Object} `options`
	* @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	* @api public
	*/
	picomatch$2.parse = (pattern, options) => {
		if (Array.isArray(pattern)) return pattern.map((p) => picomatch$2.parse(p, options));
		return parse(pattern, {
			...options,
			fastpaths: false
		});
	};
	/**
	* Scan a glob pattern to separate the pattern into segments.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.scan(input[, options]);
	*
	* const result = picomatch.scan('!./foo/*.js');
	* console.log(result);
	* { prefix: '!./',
	*   input: '!./foo/*.js',
	*   start: 3,
	*   base: 'foo',
	*   glob: '*.js',
	*   isBrace: false,
	*   isBracket: false,
	*   isGlob: true,
	*   isExtglob: false,
	*   isGlobstar: false,
	*   negated: true }
	* ```
	* @param {String} `input` Glob pattern to scan.
	* @param {Object} `options`
	* @return {Object} Returns an object with
	* @api public
	*/
	picomatch$2.scan = (input, options) => scan(input, options);
	/**
	* Compile a regular expression from the `state` object returned by the
	* [parse()](#parse) method.
	*
	* @param {Object} `state`
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	* @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	* @return {RegExp}
	* @api public
	*/
	picomatch$2.compileRe = (state, options, returnOutput = false, returnState = false) => {
		if (returnOutput === true) return state.output;
		const opts = options || {};
		const prepend = opts.contains ? "" : "^";
		const append = opts.contains ? "" : "$";
		let source = `${prepend}(?:${state.output})${append}`;
		if (state && state.negated === true) source = `^(?!${source}).*$`;
		const regex = picomatch$2.toRegex(source, options);
		if (returnState === true) regex.state = state;
		return regex;
	};
	/**
	* Create a regular expression from a parsed glob pattern.
	*
	* ```js
	* const picomatch = require('picomatch');
	* const state = picomatch.parse('*.js');
	* // picomatch.compileRe(state[, options]);
	*
	* console.log(picomatch.compileRe(state));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `state` The object returned from the `.parse` method.
	* @param {Object} `options`
	* @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	* @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	* @return {RegExp} Returns a regex created from the given pattern.
	* @api public
	*/
	picomatch$2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
		if (!input || typeof input !== "string") throw new TypeError("Expected a non-empty string");
		let parsed = {
			negated: false,
			fastpaths: true
		};
		if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) parsed.output = parse.fastpaths(input, options);
		if (!parsed.output) parsed = parse(input, options);
		return picomatch$2.compileRe(parsed, options, returnOutput, returnState);
	};
	/**
	* Create a regular expression from the given regex source string.
	*
	* ```js
	* const picomatch = require('picomatch');
	* // picomatch.toRegex(source[, options]);
	*
	* const { output } = picomatch.parse('*.js');
	* console.log(picomatch.toRegex(output));
	* //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	* ```
	* @param {String} `source` Regular expression source string.
	* @param {Object} `options`
	* @return {RegExp}
	* @api public
	*/
	picomatch$2.toRegex = (source, options) => {
		try {
			const opts = options || {};
			return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
		} catch (err) {
			if (options && options.debug === true) throw err;
			return /$^/;
		}
	};
	/**
	* Picomatch constants.
	* @return {Object}
	*/
	picomatch$2.constants = constants;
	/**
	* Expose "picomatch"
	*/
	module.exports = picomatch$2;
} });

//#endregion
//#region node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/index.js
var require_picomatch = __commonJS({ "node_modules/.pnpm/picomatch@4.0.2/node_modules/picomatch/index.js"(exports, module) {
	const pico = require_picomatch$1();
	const utils = require_utils();
	function picomatch$1(glob$1, options, returnState = false) {
		if (options && (options.windows === null || options.windows === void 0)) options = {
			...options,
			windows: utils.isWindows()
		};
		return pico(glob$1, options, returnState);
	}
	Object.assign(picomatch$1, pico);
	module.exports = picomatch$1;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/builder/index.js
var require_builder = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/builder/index.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Builder = void 0;
	const path_1 = __require("path");
	const api_builder_1 = require_api_builder();
	var pm = null;
	/* c8 ignore next 6 */
	try {
		__require.resolve("picomatch");
		pm = require_picomatch();
	} catch (_e) {}
	var Builder = class {
		globCache = {};
		options = {
			maxDepth: Infinity,
			suppressErrors: true,
			pathSeparator: path_1.sep,
			filters: []
		};
		globFunction;
		constructor(options) {
			this.options = {
				...this.options,
				...options
			};
			this.globFunction = this.options.globFunction;
		}
		group() {
			this.options.group = true;
			return this;
		}
		withPathSeparator(separator) {
			this.options.pathSeparator = separator;
			return this;
		}
		withBasePath() {
			this.options.includeBasePath = true;
			return this;
		}
		withRelativePaths() {
			this.options.relativePaths = true;
			return this;
		}
		withDirs() {
			this.options.includeDirs = true;
			return this;
		}
		withMaxDepth(depth$1) {
			this.options.maxDepth = depth$1;
			return this;
		}
		withMaxFiles(limit) {
			this.options.maxFiles = limit;
			return this;
		}
		withFullPaths() {
			this.options.resolvePaths = true;
			this.options.includeBasePath = true;
			return this;
		}
		withErrors() {
			this.options.suppressErrors = false;
			return this;
		}
		withSymlinks({ resolvePaths = true } = {}) {
			this.options.resolveSymlinks = true;
			this.options.useRealPaths = resolvePaths;
			return this.withFullPaths();
		}
		withAbortSignal(signal) {
			this.options.signal = signal;
			return this;
		}
		normalize() {
			this.options.normalizePath = true;
			return this;
		}
		filter(predicate) {
			this.options.filters.push(predicate);
			return this;
		}
		onlyDirs() {
			this.options.excludeFiles = true;
			this.options.includeDirs = true;
			return this;
		}
		exclude(predicate) {
			this.options.exclude = predicate;
			return this;
		}
		onlyCounts() {
			this.options.onlyCounts = true;
			return this;
		}
		crawl(root) {
			return new api_builder_1.APIBuilder(root || ".", this.options);
		}
		withGlobFunction(fn) {
			this.globFunction = fn;
			return this;
		}
		/**
		* @deprecated Pass options using the constructor instead:
		* ```ts
		* new fdir(options).crawl("/path/to/root");
		* ```
		* This method will be removed in v7.0
		*/
		/* c8 ignore next 4 */
		crawlWithOptions(root, options) {
			this.options = {
				...this.options,
				...options
			};
			return new api_builder_1.APIBuilder(root || ".", this.options);
		}
		glob(...patterns) {
			if (this.globFunction) return this.globWithOptions(patterns);
			return this.globWithOptions(patterns, ...[{ dot: true }]);
		}
		globWithOptions(patterns, ...options) {
			const globFn = this.globFunction || pm;
			/* c8 ignore next 5 */
			if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
			var isMatch = this.globCache[patterns.join("\0")];
			if (!isMatch) {
				isMatch = globFn(patterns, ...options);
				this.globCache[patterns.join("\0")] = isMatch;
			}
			this.options.filters.push((path$2) => isMatch(path$2));
			return this;
		}
	};
	exports.Builder = Builder;
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/types.js
var require_types = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/types.js"(exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
} });

//#endregion
//#region node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/index.js
var require_dist = __commonJS({ "node_modules/.pnpm/fdir@6.4.4_picomatch@4.0.2/node_modules/fdir/dist/index.js"(exports) {
	var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	});
	var __exportStar = void 0 && (void 0).__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fdir = void 0;
	const builder_1 = require_builder();
	Object.defineProperty(exports, "fdir", {
		enumerable: true,
		get: function() {
			return builder_1.Builder;
		}
	});
	__exportStar(require_types(), exports);
} });

//#endregion
//#region node_modules/.pnpm/tinyglobby@0.2.13/node_modules/tinyglobby/dist/index.mjs
var import_dist = __toESM(require_dist(), 1);
var import_picomatch = __toESM(require_picomatch(), 1);
var import_picomatch$1 = __toESM(require_picomatch(), 1);
var ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options) {
	const patternsCount = patterns.length;
	const patternsParts = Array(patternsCount);
	const regexes = Array(patternsCount);
	for (let i = 0; i < patternsCount; i++) {
		const parts = splitPattern(patterns[i]);
		patternsParts[i] = parts;
		const partsCount = parts.length;
		const partRegexes = Array(partsCount);
		for (let j = 0; j < partsCount; j++) partRegexes[j] = import_picomatch$1.default.makeRe(parts[j], options);
		regexes[i] = partRegexes;
	}
	return (input) => {
		const inputParts = input.split("/");
		if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return true;
		for (let i = 0; i < patterns.length; i++) {
			const patternParts = patternsParts[i];
			const regex = regexes[i];
			const inputPatternCount = inputParts.length;
			const minParts = Math.min(inputPatternCount, patternParts.length);
			let j = 0;
			while (j < minParts) {
				const part = patternParts[j];
				if (part.includes("/")) return true;
				const match = regex[j].test(inputParts[j]);
				if (!match) break;
				if (part === "**") return true;
				j++;
			}
			if (j === inputPatternCount) return true;
		}
		return false;
	};
}
var splitPatternOptions = { parts: true };
function splitPattern(path2) {
	var _a;
	const result = import_picomatch$1.default.scan(path2, splitPatternOptions);
	return ((_a = result.parts) == null ? void 0 : _a.length) ? result.parts : [path2];
}
var isWin = process.platform === "win32";
var POSIX_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g;
var WIN32_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g;
var escapePosixPath = (path2) => path2.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapeWin32Path = (path2) => path2.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options) {
	if ((options == null ? void 0 : options.caseSensitiveMatch) === false) return true;
	const scan$2 = import_picomatch$1.default.scan(pattern);
	return scan$2.isGlob || scan$2.negated;
}
function log(...tasks) {
	console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
var PARENT_DIRECTORY = /^(\/?\.\.)+/;
var ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
var BACKSLASHES = /\\/g;
function normalizePattern(pattern, expandDirectories, cwd$1, props, isIgnore) {
	var _a;
	let result = pattern;
	if (pattern.endsWith("/")) result = pattern.slice(0, -1);
	if (!result.endsWith("*") && expandDirectories) result += "/**";
	if (path$1.isAbsolute(result.replace(ESCAPING_BACKSLASHES, ""))) result = posix.relative(escapePath(cwd$1), result);
	else result = posix.normalize(result);
	const parentDirectoryMatch = PARENT_DIRECTORY.exec(result);
	if (parentDirectoryMatch == null ? void 0 : parentDirectoryMatch[0]) {
		const potentialRoot = posix.join(cwd$1, parentDirectoryMatch[0]);
		if (props.root.length > potentialRoot.length) {
			props.root = potentialRoot;
			props.depthOffset = -(parentDirectoryMatch[0].length + 1) / 3;
		}
	} else if (!isIgnore && props.depthOffset >= 0) {
		const parts = splitPattern(result);
		(_a = props.commonPath) != null || (props.commonPath = parts);
		const newCommonPath = [];
		const length = Math.min(props.commonPath.length, parts.length);
		for (let i = 0; i < length; i++) {
			const part = parts[i];
			if (part === "**" && !parts[i + 1]) {
				newCommonPath.pop();
				break;
			}
			if (part !== props.commonPath[i] || isDynamicPattern(part) || i === parts.length - 1) break;
			newCommonPath.push(part);
		}
		props.depthOffset = newCommonPath.length;
		props.commonPath = newCommonPath;
		props.root = newCommonPath.length > 0 ? path$1.posix.join(cwd$1, ...newCommonPath) : cwd$1;
	}
	return result;
}
function processPatterns({ patterns, ignore = [], expandDirectories = true }, cwd$1, props) {
	if (typeof patterns === "string") patterns = [patterns];
	else if (!patterns) patterns = ["**/*"];
	if (typeof ignore === "string") ignore = [ignore];
	const matchPatterns = [];
	const ignorePatterns = [];
	for (const pattern of ignore) {
		if (!pattern) continue;
		if (pattern[0] !== "!" || pattern[1] === "(") ignorePatterns.push(normalizePattern(pattern, expandDirectories, cwd$1, props, true));
	}
	for (const pattern of patterns) {
		if (!pattern) continue;
		if (pattern[0] !== "!" || pattern[1] === "(") matchPatterns.push(normalizePattern(pattern, expandDirectories, cwd$1, props, false));
		else if (pattern[1] !== "!" || pattern[2] === "(") ignorePatterns.push(normalizePattern(pattern.slice(1), expandDirectories, cwd$1, props, true));
	}
	return {
		match: matchPatterns,
		ignore: ignorePatterns
	};
}
function getRelativePath(path2, cwd$1, root) {
	return posix.relative(cwd$1, `${root}/${path2}`) || ".";
}
function processPath(path2, cwd$1, root, isDirectory, absolute) {
	const relativePath = absolute ? path2.slice(root === "/" ? 1 : root.length + 1) || "." : path2;
	if (root === cwd$1) return isDirectory && relativePath !== "." ? relativePath.slice(0, -1) : relativePath;
	return getRelativePath(relativePath, cwd$1, root);
}
function formatPaths(paths, cwd$1, root) {
	for (let i = paths.length - 1; i >= 0; i--) {
		const path2 = paths[i];
		paths[i] = getRelativePath(path2, cwd$1, root) + (!path2 || path2.endsWith("/") ? "/" : "");
	}
	return paths;
}
function crawl(options, cwd$1, sync$1) {
	if (process.env.TINYGLOBBY_DEBUG) options.debug = true;
	if (options.debug) log("globbing with options:", options, "cwd:", cwd$1);
	if (Array.isArray(options.patterns) && options.patterns.length === 0) return sync$1 ? [] : Promise.resolve([]);
	const props = {
		root: cwd$1,
		commonPath: null,
		depthOffset: 0
	};
	const processed = processPatterns(options, cwd$1, props);
	const nocase = options.caseSensitiveMatch === false;
	if (options.debug) log("internal processing patterns:", processed);
	const matcher = (0, import_picomatch.default)(processed.match, {
		dot: options.dot,
		nocase,
		ignore: processed.ignore
	});
	const ignore = (0, import_picomatch.default)(processed.ignore, {
		dot: options.dot,
		nocase
	});
	const partialMatcher = getPartialMatcher(processed.match, {
		dot: options.dot,
		nocase
	});
	const fdirOptions = {
		filters: [options.debug ? (p, isDirectory) => {
			const path2 = processPath(p, cwd$1, props.root, isDirectory, options.absolute);
			const matches = matcher(path2);
			if (matches) log(`matched ${path2}`);
			return matches;
		} : (p, isDirectory) => matcher(processPath(p, cwd$1, props.root, isDirectory, options.absolute))],
		exclude: options.debug ? (_, p) => {
			const relativePath = processPath(p, cwd$1, props.root, true, true);
			const skipped = relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
			if (skipped) log(`skipped ${p}`);
			else log(`crawling ${p}`);
			return skipped;
		} : (_, p) => {
			const relativePath = processPath(p, cwd$1, props.root, true, true);
			return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
		},
		pathSeparator: "/",
		relativePaths: true,
		resolveSymlinks: true
	};
	if (options.deep) fdirOptions.maxDepth = Math.round(options.deep - props.depthOffset);
	if (options.absolute) {
		fdirOptions.relativePaths = false;
		fdirOptions.resolvePaths = true;
		fdirOptions.includeBasePath = true;
	}
	if (options.followSymbolicLinks === false) {
		fdirOptions.resolveSymlinks = false;
		fdirOptions.excludeSymlinks = true;
	}
	if (options.onlyDirectories) {
		fdirOptions.excludeFiles = true;
		fdirOptions.includeDirs = true;
	} else if (options.onlyFiles === false) fdirOptions.includeDirs = true;
	props.root = props.root.replace(BACKSLASHES, "");
	const root = props.root;
	if (options.debug) log("internal properties:", props);
	const api = new import_dist.fdir(fdirOptions).crawl(root);
	if (cwd$1 === root || options.absolute) return sync$1 ? api.sync() : api.withPromise();
	return sync$1 ? formatPaths(api.sync(), cwd$1, root) : api.withPromise().then((paths) => formatPaths(paths, cwd$1, root));
}
async function glob(patternsOrOptions, options) {
	if (patternsOrOptions && (options == null ? void 0 : options.patterns)) throw new Error("Cannot pass patterns as both an argument and an option");
	const opts = Array.isArray(patternsOrOptions) || typeof patternsOrOptions === "string" ? {
		...options,
		patterns: patternsOrOptions
	} : patternsOrOptions;
	const cwd$1 = opts.cwd ? path$1.resolve(opts.cwd).replace(BACKSLASHES, "/") : process.cwd().replace(BACKSLASHES, "/");
	return crawl(opts, cwd$1, false);
}

//#endregion
//#region src/run.ts
const TEMP_DIR = path.resolve("./gitee-mirror-temp");
function nowDate() {
	return new Date().toLocaleString();
}
async function main() {
	const pattern = getInput("files");
	const giteeRepo = getInput("gitee_repo");
	const sshKey = getInput("gitee_token");
	startGroup("准备文件");
	ensureDirSync(TEMP_DIR);
	info(`🔧 创建临时目录 ${TEMP_DIR}`);
	const files = await glob(pattern);
	debug(`files: ${files}`);
	if (files.length === 0) throw new Error(`No files matched pattern: ${pattern}`);
	for (const file of files) {
		const dest = path.join(TEMP_DIR, file);
		copySync(file, dest);
	}
	info("待提交文件准备完成");
	endGroup();
	startGroup("配置 SSH");
	const sshPath = path.join(process$1.env.HOME || process$1.cwd(), ".ssh");
	const keyPath = path.join(sshPath, "id_rsa");
	debug("写入 .ssh/id_rsa");
	outputFileSync(keyPath, `${sshKey}\n`);
	process$1.env.GIT_SSH_COMMAND = `StrictHostKeyChecking=no`;
	endGroup();
	startGroup("执行 Git");
	const { stdout: hash } = await be("git", ["rev-parse", "HEAD"]);
	const commitMsg = `Mirror from GitHub for ${hash.trim()} at ${nowDate()}`;
	process$1.chdir(TEMP_DIR);
	await be("git", ["init"], { throwOnError: true });
	await be("git", [
		"remote",
		"add",
		"origin",
		giteeRepo
	], { throwOnError: true });
	await be("git", ["add", "."], { throwOnError: true });
	await be("git", [
		"commit",
		"-m",
		commitMsg
	], { throwOnError: true });
	await be("git", [
		"branch",
		"-M",
		"main"
	], { throwOnError: true });
	await be("git", [
		"push",
		"-f",
		"origin",
		"main"
	], { throwOnError: true });
	info("✅ 已完成 Gitee 镜像");
	endGroup();
}
async function run() {
	await main().catch((e) => {
		if (e instanceof x) {
			console.error(e.output);
			error(e.output?.stderr ?? e.message);
			setFailed(e.output?.stderr ?? e.message);
		} else {
			setFailed(e instanceof Error ? e : String(e));
			console.error(e);
		}
	});
}

//#endregion
//#region src/index.ts
run();

//#endregion