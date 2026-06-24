# Guía de Desarrollo / Guia de Desenvolvimento

## 🇪🇸 Guía de Desarrollo

### 📌 Convenciones del Proyecto

#### Estructura de Carpetas
```
src/
├── components/    # Componentes React reutilizables
├── pages/         # Páginas principales (rutas)
├── services/      # Servicios HTTP y API calls
├── stores/        # Estado global con Zustand
├── hooks/         # Custom React hooks
├── types/         # Definiciones de tipos TypeScript
├── schemas/       # Esquemas de validación Yup
├── lib/           # Utilitarios y helpers
├── layouts/       # Layouts base
└── routes/        # Configuración de rutas
```

#### Nomenclatura de Archivos

- **Componentes**: `PascalCase` + `.tsx`
  ```
  src/components/auth/LoginForm.tsx
  src/components/balance-card/BalanceCard.tsx
  ```

- **Hooks**: `camelCase` + `.ts`
  ```
  src/hooks/useDebounce.ts
  src/hooks/useTransfer.ts
  ```

- **Servicios**: `kebab-case` + `.service.ts`
  ```
  src/services/auth/auth.service.ts
  src/services/transfer/transfer.service.ts
  ```

- **Stores**: `kebab-case` + `.store.ts`
  ```
  src/stores/auth/auth.store.ts
  src/stores/transfer/transfer.store.ts
  ```

- **Tipos**: `PascalCase` + `.type.ts` + sufijo `Type`
  ```
  src/types/user.type.ts -> UserType
  src/types/transfer.type.ts -> TransferType
  ```

#### Estructura de Componentes

```typescript
// src/components/MyComponent/MyComponent.tsx

import { useState } from "react"
import type { MyComponentProps } from "./MyComponent.types"

/**
 * Descripción breve del componente
 * @param props - Propiedades del componente
 */
function MyComponent({ prop1, prop2 }: MyComponentProps) {
  const [state, setState] = useState("")

  const handleClick = () => {
    setState("new value")
  }

  return (
    <div>
      <h1>{prop1}</h1>
      <button onClick={handleClick}>{prop2}</button>
    </div>
  )
}

export default MyComponent
```

#### Tipos TypeScript

```typescript
// src/types/mytype.type.ts

export type MyType = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export type MyTypeResponse = {
  data: MyType
  message: string
  statusCode: number
}
```

#### Servicios HTTP

```typescript
// src/services/myservice/myservice.service.ts

import { BaseService } from "@/services/common/base.service.ts"
import type { MyTypeResponse } from "@/types/mytype.type.ts"

export class MyService extends BaseService {
  private static instance: MyService

  private constructor() {
    super()
  }

  static getInstance(): MyService {
    if (!MyService.instance) {
      MyService.instance = new MyService()
    }
    return MyService.instance
  }

  async fetchData(id: string) {
    return await this.get<MyTypeResponse>(`/endpoint/${id}`)
  }

  async createData(payload: unknown) {
    return await this.post<MyTypeResponse>("/endpoint", payload)
  }
}
```

#### Zustand Stores

```typescript
// src/stores/mystore/mystore.store.ts

import { create } from "zustand"
import { persist } from "zustand/middleware"

type MyState = {
  value: string
  loading: boolean
}

type MyActions = {
  setValue: (value: string) => void
  setLoading: (loading: boolean) => void
}

export const useMyStore = create<MyState & MyActions>()(
  persist(
    (set) => ({
      value: "",
      loading: false,
      setValue: (value) => set({ value }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "mystore" }
  )
)
```

#### Validación con Yup

```typescript
// src/schemas/myform.schema.ts

import * as yup from "yup"

export const myFormSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email es requerido"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña es requerida"),
}).strict()
```

#### Formularios con React Hook Form

```typescript
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { myFormSchema } from "@/schemas/myform.schema.ts"

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(myFormSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### 🧪 Testing

#### Estructura de Tests

```typescript
// src/components/MyComponent/MyComponent.test.tsx

import { render, screen } from "@testing-library/react"
import MyComponent from "./MyComponent"

describe("MyComponent", () => {
  it("should render component with props", () => {
    render(
      <MyComponent prop1="Title" prop2="Label" />
    )

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Label")).toBeInTheDocument()
  })

  it("should handle click event", async () => {
    const user = userEvent.setup()
    render(
      <MyComponent prop1="Title" prop2="Click me" />
    )

    const button = screen.getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(screen.getByText("new value")).toBeInTheDocument()
  })
})
```

#### Mejores Prácticas de Testing

1. **Prueba el comportamiento, no la implementación**
   ```typescript
   // ✅ Bueno
   expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()

   // ❌ Malo
   expect(wrapper.find(".submit-btn")).toHaveLength(1)
   ```

2. **Usa queries en orden de preferencia**
   ```typescript
   // 1. getByRole - Mejor accesibilidad
   screen.getByRole("button", { name: /submit/i })

   // 2. getByLabelText - Para inputs
   screen.getByLabelText("Email")

   // 3. getByPlaceholderText
   screen.getByPlaceholderText("Enter email")

   // 4. getByText
   screen.getByText("Hello")
   ```

3. **Mockea dependencias externas**
   ```typescript
   jest.mock("@/stores/auth/auth.store", () => ({
     useAuthStore: () => ({
       user: { id: "1", name: "Test User" },
       login: jest.fn(),
     }),
   }))
   ```

### 🎨 Componentes UI

#### Usando shadcn/ui

```bash
# Agregar un componente
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
```

#### Componentes Disponibles

- Button
- Input
- Card
- Label
- Avatar
- Dropdown Menu
- Sheet (Modal)
- Skeleton
- Separator

Documentación: https://ui.shadcn.com

### 🎯 Flujos de Datos

#### Flujo Autenticación

```
LoginForm → AuthService.login()
    ↓
Auth Store (setToken, setUser)
    ↓
localStorage (token)
    ↓
Protected Routes
    ↓
Home Page
```

#### Flujo de Transferencias

```
Home Page (useEffect)
    ↓
TransferStore.fetchTransfer()
    ↓
TransferService.getTransfers()
    ↓
GroupTransfersByDate()
    ↓
TransferList (render)
    ↓
TransferFilter (buscar)
    ↓
CreateTransferForm (crear)
```

### 🔒 Seguridad

1. **Token en localStorage**
   - Almacenado en Auth Store
   - Enviado en headers Authorization
   - Verificado en rutas protegidas

2. **Validación de Formularios**
   - Validación client-side con Yup
   - Validación server-side (backend)
   - Manejo de errores

3. **CORS**
   - Backend debe permitir CORS desde frontend
   - Configurar en servidor

### 📝 Documentación de Código

```typescript
/**
 * Fetch del saldo del usuario
 * @param userId - ID del usuario
 * @returns Promise con datos del saldo
 * @throws Error si falla la llamada
 * @example
 * const balance = await fetchBalance("user-123")
 */
async function fetchBalance(userId: string): Promise<BalanceType> {
  // implementación
}
```

### 🐛 Debugging

#### Console Logging
```typescript
console.log("[Auth]", "User logged in", user)
console.warn("[Transfer]", "Warning message")
console.error("[API]", "Error message", error)
```

#### React DevTools
- Instala extensión React DevTools
- Inspecciona componentes y props
- Visualiza cambios de estado

#### Redux DevTools (Zustand)
- Usa middleware de Zustand
- Visualiza cambios de estado
- Viaja en el tiempo (time travel)

### 📦 Build y Deployment

#### Build Producción
```bash
pnpm build

# Archivos en dist/
```

#### Deployment
- Vercel: Conecta repo de GitHub
- Netlify: Drop dist/ folder
- AWS S3 + CloudFront
- Docker: Crea imagen con Dockerfile

### 🔄 Git Workflow

#### Branch Naming
- `feature/feature-name` - Nuevas características
- `bugfix/bug-name` - Correcciones
- `chore/task-name` - Tareas
- `test/test-name` - Tests

#### Commits Atómicos
```bash
git add <file>
git commit -m "feat: agregar nueva funcionalidad"
```

Formato: `type: descripción`
- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Documentación
- `style:` - Formato de código
- `test:` - Tests
- `chore:` - Configuración

---

## 🇧🇷 Guia de Desenvolvimento

### 📌 Convenções do Projeto

#### Estrutura de Pastas
```
src/
├── components/    # Componentes React reutilizáveis
├── pages/         # Páginas principais (rotas)
├── services/      # Serviços HTTP e chamadas API
├── stores/        # Estado global com Zustand
├── hooks/         # Custom React hooks
├── types/         # Definições de tipos TypeScript
├── schemas/       # Esquemas de validação Yup
├── lib/           # Utilitários e helpers
├── layouts/       # Layouts base
└── routes/        # Configuração de rotas
```

#### Nomenclatura de Arquivos

- **Componentes**: `PascalCase` + `.tsx`
  ```
  src/components/auth/LoginForm.tsx
  src/components/balance-card/BalanceCard.tsx
  ```

- **Hooks**: `camelCase` + `.ts`
  ```
  src/hooks/useDebounce.ts
  src/hooks/useTransfer.ts
  ```

- **Serviços**: `kebab-case` + `.service.ts`
  ```
  src/services/auth/auth.service.ts
  src/services/transfer/transfer.service.ts
  ```

- **Stores**: `kebab-case` + `.store.ts`
  ```
  src/stores/auth/auth.store.ts
  src/stores/transfer/transfer.store.ts
  ```

- **Tipos**: `PascalCase` + `.type.ts` + sufixo `Type`
  ```
  src/types/user.type.ts -> UserType
  src/types/transfer.type.ts -> TransferType
  ```

#### Estrutura de Componentes

```typescript
// src/components/MyComponent/MyComponent.tsx

import { useState } from "react"
import type { MyComponentProps } from "./MyComponent.types"

/**
 * Descrição breve do componente
 * @param props - Propriedades do componente
 */
function MyComponent({ prop1, prop2 }: MyComponentProps) {
  const [state, setState] = useState("")

  const handleClick = () => {
    setState("novo valor")
  }

  return (
    <div>
      <h1>{prop1}</h1>
      <button onClick={handleClick}>{prop2}</button>
    </div>
  )
}

export default MyComponent
```

#### Tipos TypeScript

```typescript
// src/types/mytype.type.ts

export type MyType = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export type MyTypeResponse = {
  data: MyType
  message: string
  statusCode: number
}
```

#### Serviços HTTP

```typescript
// src/services/myservice/myservice.service.ts

import { BaseService } from "@/services/common/base.service.ts"
import type { MyTypeResponse } from "@/types/mytype.type.ts"

export class MyService extends BaseService {
  private static instance: MyService

  private constructor() {
    super()
  }

  static getInstance(): MyService {
    if (!MyService.instance) {
      MyService.instance = new MyService()
    }
    return MyService.instance
  }

  async fetchData(id: string) {
    return await this.get<MyTypeResponse>(`/endpoint/${id}`)
  }

  async createData(payload: unknown) {
    return await this.post<MyTypeResponse>("/endpoint", payload)
  }
}
```

#### Zustand Stores

```typescript
// src/stores/mystore/mystore.store.ts

import { create } from "zustand"
import { persist } from "zustand/middleware"

type MyState = {
  value: string
  loading: boolean
}

type MyActions = {
  setValue: (value: string) => void
  setLoading: (loading: boolean) => void
}

export const useMyStore = create<MyState & MyActions>()(
  persist(
    (set) => ({
      value: "",
      loading: false,
      setValue: (value) => set({ value }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "mystore" }
  )
)
```

#### Validação com Yup

```typescript
// src/schemas/myform.schema.ts

import * as yup from "yup"

export const myFormSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha é obrigatória"),
}).strict()
```

#### Formulários com React Hook Form

```typescript
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { myFormSchema } from "@/schemas/myform.schema.ts"

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(myFormSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### 🧪 Testes

#### Estrutura de Testes

```typescript
// src/components/MyComponent/MyComponent.test.tsx

import { render, screen } from "@testing-library/react"
import MyComponent from "./MyComponent"

describe("MyComponent", () => {
  it("deve renderizar componente com props", () => {
    render(
      <MyComponent prop1="Título" prop2="Rótulo" />
    )

    expect(screen.getByText("Título")).toBeInTheDocument()
    expect(screen.getByText("Rótulo")).toBeInTheDocument()
  })

  it("deve lidar com evento de clique", async () => {
    const user = userEvent.setup()
    render(
      <MyComponent prop1="Título" prop2="Clique aqui" />
    )

    const button = screen.getByRole("button", { name: /clique aqui/i })
    await user.click(button)

    expect(screen.getByText("novo valor")).toBeInTheDocument()
  })
})
```

#### Melhores Práticas de Testes

1. **Teste o comportamento, não a implementação**
   ```typescript
   // ✅ Bom
   expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()

   // ❌ Ruim
   expect(wrapper.find(".submit-btn")).toHaveLength(1)
   ```

2. **Use queries em ordem de preferência**
   ```typescript
   // 1. getByRole - Melhor acessibilidade
   screen.getByRole("button", { name: /submit/i })

   // 2. getByLabelText - Para inputs
   screen.getByLabelText("Email")

   // 3. getByPlaceholderText
   screen.getByPlaceholderText("Enter email")

   // 4. getByText
   screen.getByText("Olá")
   ```

3. **Mocke dependências externas**
   ```typescript
   jest.mock("@/stores/auth/auth.store", () => ({
     useAuthStore: () => ({
       user: { id: "1", name: "Usuário Teste" },
       login: jest.fn(),
     }),
   }))
   ```

### 🎨 Componentes UI

#### Usando shadcn/ui

```bash
# Adicionar um componente
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
```

#### Componentes Disponíveis

- Button
- Input
- Card
- Label
- Avatar
- Dropdown Menu
- Sheet (Modal)
- Skeleton
- Separator

Documentação: https://ui.shadcn.com

### 🎯 Fluxos de Dados

#### Fluxo Autenticação

```
LoginForm → AuthService.login()
    ↓
Auth Store (setToken, setUser)
    ↓
localStorage (token)
    ↓
Protected Routes
    ↓
Home Page
```

#### Fluxo de Transferências

```
Home Page (useEffect)
    ↓
TransferStore.fetchTransfer()
    ↓
TransferService.getTransfers()
    ↓
GroupTransfersByDate()
    ↓
TransferList (render)
    ↓
TransferFilter (buscar)
    ↓
CreateTransferForm (criar)
```

### 🔒 Segurança

1. **Token em localStorage**
   - Armazenado em Auth Store
   - Enviado em headers Authorization
   - Verificado em rotas protegidas

2. **Validação de Formulários**
   - Validação client-side com Yup
   - Validação server-side (backend)
   - Manipulação de erros

3. **CORS**
   - Backend deve permitir CORS do frontend
   - Configurar no servidor

### 📝 Documentação de Código

```typescript
/**
 * Busca do saldo do usuário
 * @param userId - ID do usuário
 * @returns Promise com dados do saldo
 * @throws Error se a chamada falhar
 * @example
 * const balance = await fetchBalance("user-123")
 */
async function fetchBalance(userId: string): Promise<BalanceType> {
  // implementação
}
```

### 🐛 Debugging

#### Console Logging
```typescript
console.log("[Auth]", "Usuário logado", user)
console.warn("[Transfer]", "Mensagem de aviso")
console.error("[API]", "Mensagem de erro", error)
```

#### React DevTools
- Instale extensão React DevTools
- Inspecione componentes e props
- Visualize mudanças de estado

#### Redux DevTools (Zustand)
- Use middleware do Zustand
- Visualize mudanças de estado
- Viaje no tempo (time travel)

### 📦 Build e Deployment

#### Build Produção
```bash
pnpm build

# Arquivos em dist/
```

#### Deployment
- Vercel: Conecte repo do GitHub
- Netlify: Drop pasta dist/
- AWS S3 + CloudFront
- Docker: Crie imagem com Dockerfile

### 🔄 Git Workflow

#### Branch Naming
- `feature/feature-name` - Novas funcionalidades
- `bugfix/bug-name` - Correções
- `chore/task-name` - Tarefas
- `test/test-name` - Testes

#### Commits Atômicos
```bash
git add <file>
git commit -m "feat: adicionar nova funcionalidade"
```

Formato: `type: descrição`
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formato de código
- `test:` - Testes
- `chore:` - Configuração
