import { Document, Category } from '../store/useStore'

export const mockCategories: Category[] = [
  {
    id: '1',
    name: '技术文档',
    description: '技术相关的文档和教程',
    documentCount: 15
  },
  {
    id: '2',
    name: 'API 参考',
    description: 'API 接口文档和参考',
    documentCount: 8
  },
  {
    id: '3',
    name: '最佳实践',
    description: '开发最佳实践和规范',
    documentCount: 12
  },
  {
    id: '4',
    name: '架构设计',
    description: '系统架构和设计文档',
    documentCount: 6
  }
]

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'React 18 新特性详解',
    content: `# React 18 新特性详解

React 18 带来了许多令人兴奋的新特性，让我们一起来探索这些改进。

## 并发特性 (Concurrent Features)

React 18 引入了并发渲染，这是一个重大的架构改进。

### Automatic Batching

在 React 18 中，所有的状态更新都会自动批处理，包括在 Promise、setTimeout 和原生事件处理器中的更新。

\`\`\`javascript
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // React 18 会自动批处理这些更新
    setCount(c => c + 1);
    setFlag(f => !f);
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
\`\`\`

### Suspense 改进

Suspense 现在支持更多的使用场景，包括服务端渲染。

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <ProfilePage />
</Suspense>
\`\`\`

## 新的 Hooks

### useId

为服务端渲染生成唯一的 ID。

\`\`\`javascript
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
}
\`\`\`

### useDeferredValue

延迟更新非紧急的状态。

\`\`\`javascript
function App() {
  const [text, setText] = useState("hello");
  const deferredText = useDeferredValue(text);
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </div>
  );
}
\`\`\`

## 总结

React 18 的这些新特性让我们能够构建更快、更流畅的用户界面。并发特性是最大的亮点，它为未来的优化奠定了基础。`,
    excerpt: 'React 18 带来了并发特性、自动批处理、Suspense 改进等重要更新，让我们深入了解这些新特性。',
    author: '张三',
    category: '技术文档',
    tags: ['React', 'JavaScript', '前端开发'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    viewCount: 1250
  },
  {
    id: '2',
    title: 'TypeScript 高级类型系统',
    content: `# TypeScript 高级类型系统

TypeScript 的类型系统非常强大，让我们探索一些高级特性。

## 条件类型 (Conditional Types)

条件类型允许我们根据条件选择类型。

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>;   // false
\`\`\`

## 映射类型 (Mapped Types)

映射类型可以基于现有类型创建新类型。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型。

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type FocusEvent = EventName<"focus">; // "onFocus"
type ClickEvent = EventName<"click">; // "onClick"
\`\`\`

## 实用工具类型

TypeScript 提供了许多内置的工具类型。

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>; // 所有属性可选
type UserEmail = Pick<User, 'email'>; // 只选择 email
type UserWithoutId = Omit<User, 'id'>; // 排除 id
\`\`\``,
    excerpt: '深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等。',
    author: '李四',
    category: '技术文档',
    tags: ['TypeScript', '类型系统', '前端开发'],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    viewCount: 890
  },
  {
    id: '3',
    title: 'RESTful API 设计最佳实践',
    content: `# RESTful API 设计最佳实践

设计良好的 RESTful API 是现代 Web 应用的基础。

## HTTP 方法的正确使用

- **GET**: 获取资源
- **POST**: 创建资源
- **PUT**: 更新整个资源
- **PATCH**: 部分更新资源
- **DELETE**: 删除资源

## URL 设计原则

### 使用名词而不是动词

\`\`\`
✅ GET /users/123
❌ GET /getUser/123

✅ POST /users
❌ POST /createUser
\`\`\`

### 使用复数形式

\`\`\`
✅ GET /users
❌ GET /user
\`\`\`

## 状态码的使用

- **200 OK**: 请求成功
- **201 Created**: 资源创建成功
- **400 Bad Request**: 请求参数错误
- **401 Unauthorized**: 未授权
- **404 Not Found**: 资源不存在
- **500 Internal Server Error**: 服务器错误

## 响应格式

统一的响应格式有助于客户端处理。

\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully"
}
\`\`\`

## 分页和过滤

\`\`\`
GET /users?page=1&limit=10&sort=created_at&order=desc
\`\`\`

## 版本控制

\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\``,
    excerpt: 'RESTful API 设计的最佳实践，包括 HTTP 方法使用、URL 设计、状态码、响应格式等。',
    author: '王五',
    category: 'API 参考',
    tags: ['API', 'REST', '后端开发'],
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13',
    viewCount: 1560
  },
  {
    id: '4',
    title: '微服务架构设计指南',
    content: `# 微服务架构设计指南

微服务架构是现代大型应用的主流架构模式。

## 微服务的优势

1. **独立部署**: 每个服务可以独立部署和扩展
2. **技术多样性**: 不同服务可以使用不同的技术栈
3. **故障隔离**: 单个服务的故障不会影响整个系统
4. **团队自治**: 小团队可以独立负责一个服务

## 服务拆分原则

### 按业务能力拆分

每个微服务应该围绕一个业务能力构建。

### 数据库分离

每个微服务应该有自己的数据库。

## 服务间通信

### 同步通信

- **HTTP/REST**: 简单直观，适合实时查询
- **GraphQL**: 灵活的数据查询

### 异步通信

- **消息队列**: RabbitMQ, Apache Kafka
- **事件驱动**: 发布/订阅模式

## 服务发现

服务发现是微服务架构的关键组件。

\`\`\`yaml
# docker-compose.yml
version: '3'
services:
  consul:
    image: consul:latest
    ports:
      - "8500:8500"
  
  user-service:
    image: user-service:latest
    environment:
      - CONSUL_URL=http://consul:8500
\`\`\`

## 监控和日志

- **分布式追踪**: Jaeger, Zipkin
- **日志聚合**: ELK Stack
- **指标监控**: Prometheus + Grafana

## 部署策略

### 容器化部署

\`\`\`dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Kubernetes 部署

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
\`\`\``,
    excerpt: '微服务架构的设计指南，包括服务拆分、通信方式、服务发现、监控和部署策略。',
    author: '赵六',
    category: '架构设计',
    tags: ['微服务', '架构', '分布式系统'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    viewCount: 2100
  }
]