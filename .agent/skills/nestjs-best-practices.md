---
name: nestjs-best-practices
description: Best practices for developing REST APIs with NestJS.
---

# NestJS Best Practices

When building the backend API with NestJS:
1. **Module Architecture**: Keep the code strictly organized into domains (e.g., `users`, `couples`, `timeline`). Use the CLI (`bunx nest g`) when generating module structures to avoid wiring mistakes, if possible.
2. **Dependency Injection**: Use solid DI. Keep business logic strictly in Services (`.service.ts`), while Controllers (`.controller.ts`) only handle Request parsing and Response formatting.
3. **Validation & Security**:
   - Use `class-validator` and `class-transformer` on DTOs.
   - For Authentication/Authorization, build and use custom NestJS Guards, never validate JWTs inside the controller body.
4. **Error Handling**: Throw built-in standard HTTP Exceptions (`BadRequestException`, `NotFoundException`, etc.) or create custom Exception Filters to wrap error responses globally matching the API specifications.
5. **Database**: Use Prisma or TypeORM for PostgreSQL interaction. Avoid raw queries unless complex optimizations are needed.
