<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TodoController extends AbstractController
{
    #[Route('/todo', methods: ['GET'])]
    public function index(TodoRepository $todoRepository): Response
    {
        return $this->render('todo/index.html.twig', [
            'controller_name' => 'TodoController',
            'todos' => $todoRepository->findAll(),
        ]);
    }

    #[Route('/todo', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $todo = new Todo();
        $todo->setTask($request->request->get('task'));
        $todo->setCompleted(false);

        $em->persist($todo);
        $em->flush();
        return $this->render('todo/_item.html.twig', [
            'todo' => $todo,
        ]);
    }

    #[Route('/todo/{id}/toggle', methods: ['PUT'])]
    public function toggle(Todo $todo, EntityManagerInterface $em): Response
    {
        $todo->setCompleted(!$todo->isCompleted());
        $em->flush();
        return $this->render('todo/_item.html.twig', [
            'todo' => $todo,
        ]);
    }

    #[Route('/todo/{id}', methods: ['DELETE'])]
    public function delete(Todo $todo, EntityManagerInterface $em): Response
    {
        $em->remove($todo);
        $em->flush();

        return new Response('');
    }

    #[Route('/todo/{id}/edit', methods: ['GET'])]
    public function edit(Todo $todo): Response
    {
        return $this->render('todo/_edit.html.twig', [
            'todo' => $todo,
        ]);
    }

    #[Route('/todo/{id}', methods: ['PATCH'])]
    public function update(Request $request, Todo $todo, EntityManagerInterface $em): Response
    {
        $todo->setTask($request->request->get('task'));
        $em->flush();

        return $this->render('todo/_item.html.twig', [
            'todo' => $todo,
        ]);
    }
}
