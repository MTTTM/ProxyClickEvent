import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
export default [{
    input: "src/index.js",
    output: {
        name: "ProxyClickEvent",
        file: "dist/index.js",
        format: "umd",
        sourcemap: false,
        strict: false,
    },
    plugins: [
        cleanup({
            comments: "none",
        }),
        terser({
            output: {
                comments: "all",
            },
        }),
        copy({
            targets: [
                { src: "ProxyClickEvent.d.ts", dest: "dist" },
            ],
            verbose: true, // 在终端进行console.log
        }),
    ],
}, ];