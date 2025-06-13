import { PrismaClient, TaskStatus, Priority } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  try {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'joao@email.com',
          passwordHash:
            '$2b$10$K7L/8Y75aIsgLPZBdXNoAOdMa5qibtC2qQlHGwQe5B92aGjU5Q9S2',
          name: 'João Silva',
        },
      }),
      prisma.user.create({
        data: {
          email: 'maria@email.com',
          passwordHash:
            '$2b$10$K7L/8Y75aIsgLPZBdXNoAOdMa5qibtC2qQlHGwQe5B92aGjU5Q9S2',
          name: 'Maria Santos',
        },
      }),
    ]);

    await Promise.all([
      prisma.task.create({
        data: {
          title: 'Finalizar relatório',
          description: 'Completar relatório mensal',
          status: TaskStatus.IN_PROGRESS,
          priority: Priority.URGENT,
          dueDate: new Date('2025-01-15'),
          userId: users[0].id,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Reunião de equipe',
          status: TaskStatus.PENDING,
          priority: Priority.IMPORTANT,
          dueDate: new Date('2025-01-10'),
          userId: users[0].id,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Code review',
          status: TaskStatus.COMPLETED,
          priority: Priority.NORMAL,
          userId: users[0].id,
        },
      }),

      prisma.task.create({
        data: {
          title: 'Apresentação cliente',
          description: 'Preparar slides para cliente',
          status: TaskStatus.PENDING,
          priority: Priority.URGENT,
          dueDate: new Date('2025-01-12'),
          userId: users[1].id,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Documentação API',
          status: TaskStatus.IN_PROGRESS,
          priority: Priority.NORMAL,
          userId: users[1].id,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Treinamento equipe',
          status: TaskStatus.STANDBY,
          priority: Priority.IMPORTANT,
          userId: users[1].id,
        },
      }),

      // Tarefa sem usuário
      prisma.task.create({
        data: {
          title: 'Backup servidor',
          status: TaskStatus.PENDING,
          priority: Priority.IMPORTANT,
          dueDate: new Date('2025-01-14'),
          userId: null,
        },
      }),
    ]);
    // Tarefas da Maria

    const totalUsers = await prisma.user.count();
    const totalTasks = await prisma.task.count();

    console.log(
      `✅ Seed concluído: ${totalUsers} usuários, ${totalTasks} tarefas`,
    );
  } finally {
    await prisma.$disconnect();
  }
}
main().catch((e) => {
  console.error('❌ Erro:', e);
  process.exit(1);
});
