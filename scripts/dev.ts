#!/usr/bin/env node

// scripts/dev.ts
import { execSync } from "child_process";
import { cyan, green, yellow, red, bold, dim } from "colorette";

const run = (cmd: string, silent = false) => {
    execSync(cmd, { stdio: silent ? "ignore" : "inherit" });
};

console.clear();
console.log(bold(cyan("\nINICIANDO BORGIAN BANK – MODO DESARROLLO\n")));
console.log(dim("─".repeat(60) + "\n"));

try {
    // Paso 1: Lint
    console.log(yellow("Step 1/4 – Verificando sintaxis con ESLint"));
    run("pnpm lint");
    console.log(green("✓ Lint pasado correctamente\n"));

    // Paso 2: Build de producción (detecta errores que dev no ve)
    console.log(yellow("Step 2/4 – Build de producción (detección temprana)"));
    run("pnpm build");
    console.log(green("\n✓ Build exitoso – ¡sin errores de producción!\n"));

    // Paso 3: Limpieza opcional
    console.log(yellow("Step 3/4 – Limpiando caché de Vite"));
    run("rm -rf dist node_modules/.vite", true);
    console.log(green("✓ Cache limpiado\n"));

    // Paso 4: Iniciar servidor de desarrollo DIRECTAMENTE con vite
    console.log(yellow("Step 4/4 – Iniciando Vite dev server"));
    console.log(green("\nTodo listo! Arrancando Vite con HMR ultrarrápido…\n"));

    // Ejecutar vite directamente en lugar de pnpm dev
    run("vite");
} catch (error) {
    console.log(red("\nAlgo salió mal – revisa el paso anterior"));
    console.log(dim("\nTip: ejecuta pnpm lint / pnpm build manualmente para más detalle\n"));
    process.exit(1);
}