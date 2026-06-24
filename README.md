# BancoXYZ

## 🇪🇸 Español

Aplicación bancaria moderna con React, TypeScript y Vite.

### Instalación

```bash
pnpm install
```

### Ejecutar la aplicación

```bash
pnpm dev
```

La aplicación se abrirá en `http://localhost:3000`

### Ejecutar los tests

```bash
# Ejecutar tests una sola vez
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Ejecutar tests con cobertura
pnpm test:coverage
```

### Build para producción

```bash
pnpm build
```

## ⚠️ Nota Técnica: Uso del Proxy de Vite para la API

Durante el desarrollo de esta aplicación para la prueba técnica de **BancoXYZ**, se implementaron proxies inversos locales dentro de la configuración de Vite (`vite.config.ts`).

Esta decisión de arquitectura se tomó debido a las siguientes razones técnicas:

1. **Políticas estrictas de CORS (_Cross-Origin Resource Sharing_):** Los endpoints de AWS provistos para la prueba (`://amazonaws.com`) rechazan de forma nativa las peticiones directas realizadas desde el navegador si el origen de la llamada no coincide con sus dominios autorizados.
2. **Camuflaje de Origen (_changeOrigin_):** Al usar el proxy de Vite, el servidor local de desarrollo intercepta las rutas relativas (como `/default/...`), reescribe las cabeceras HTTP (`Host`, `Origin` y `Referer`) y actúa como un intermediario seguro. Esto permite evadir los bloqueos de red (`403 Forbidden`) y garantizar el envío intacto de las cabeceras de autorización (`Authorization: Bearer <token>`).
3. **Múltiples Servidores Remotos:** Dado que los endpoints de autenticación, saldo y transferencias pertenecen a diferentes subdominios independientes de AWS Lambda, el proxy unifica el consumo de la API bajo un mismo origen local fluido.

**Recomendación para la evaluación:** Para interactuar correctamente con todo el flujo de datos del **BancoXYZ**, se solicita amablemente clonar el repositorio y ejecutar la aplicación de forma local mediante el comando `pnpm dev`.

---

## 🇧🇷 Português Brasileiro

Aplicação bancária moderna com React, TypeScript e Vite.

### Instalação

```bash
pnpm install
```

### Executar a aplicação

```bash
pnpm dev
```

A aplicação será aberta em `http://localhost:3000`

### Executar os testes

```bash
# Executar testes uma única vez
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com cobertura
pnpm test:coverage
```

### Build para produção

```bash
pnpm build
```

## ⚠️ Nota Técnica: Uso do Proxy do Vite para a API

Durante o desenvolvimento desta aplicação para o teste técnico do **BancoXYZ**, foram implementados proxies reversos locais dentro da configuração do Vite (`vite.config.ts`).

Esta decisão de arquitetura foi tomada devido aos seguintes motivos técnicos:

1. **Políticas estritas de CORS (_Cross-Origin Resource Sharing_):** Os endpoints da AWS fornecidos para o teste (`://amazonaws.com`) rejeitam nativamente as requisições diretas feitas pelo navegador se a origem da chamada não coincidir com os seus domínios autorizados.
2. **Camuflagem de Origem (_changeOrigin_):** Ao utilizar o proxy do Vite, o servidor local de desenvolvimento intercepta as rotas relativas (como `/default/...`), reescreve os cabeçalhos HTTP (`Host`, `Origin` e `Referer`) e atua como um intermediário seguro. Isso permite evitar os bloqueios de rede (`403 Forbidden`) e garantir o envio intacto dos cabeçalhos de autenticação (`Authorization: Bearer <token>`).
3. **Múltiplos Servidores Remotos:** Como os endpoints de autenticação, saldo e transferências pertencem a subdomínios diferentes e independentes do AWS Lambda, o proxy unifica o consumo da API sob uma mesma origem local fluida.

**Recomendação para a avaliação:** Para interagir corretamente com todo o fluxo de dados do **BancoXYZ**, solicita-se gentilmente clonar o repositório e executar a aplicação de forma local através do comando `pnpm dev`.
