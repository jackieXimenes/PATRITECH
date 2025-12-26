import { NextRequest, NextResponse } from "next/server";
import ativosMock from "@/app/constant/ativosMock";

// Interface para garantir a tipagem do contexto do Next.js 15
interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET: Busca um ativo específico
export async function GET(
  req: NextRequest, 
  { params }: RouteContext 
) {
  try {
    // No Next.js 15, params deve ser aguardado (awaited)
    const { id } = await params;
    
    // Buscando o objeto específico pelo ID
    const ativo = ativosMock.find((obj) => obj.id === id);

    if (!ativo) {
      return NextResponse.json(
        { message: "Item não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(ativo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor", error },
      { status: 500 }
    );
  }
}

// PUT: Atualiza um ativo específico
export async function PUT(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // 1. Validar se o item existe
    const index = ativosMock.findIndex((obj) => obj.id === id);

    if (index === -1) {
      return NextResponse.json({ message: "Item não encontrado para atualização" }, { status: 404 });
    }

    // 2. Atualizar o mock
    ativosMock[index] = { 
      ...ativosMock[index], 
      Item: body.Item, 
      data: body.data 
    };

    console.log(`Ativo ${id} atualizado com sucesso:`, ativosMock[index]);

    return NextResponse.json(ativosMock[index], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar o ativo", error },
      { status: 500 }
    );
  }
}

// DELETE: Remove um ativo específico
export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    // Verifica se o item existe
    const index = ativosMock.findIndex((obj) => obj.id === id);
    if (index === -1) {
      return NextResponse.json({ message: "Item não encontrado" }, { status: 404 });
    }

    // Remove do array (simulando banco de dados)
    ativosMock.splice(index, 1);
    
    console.log(`Ativo ${id} excluído.`);

    return NextResponse.json({ message: "Excluído com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao excluir", error },
      { status: 500 }
    );
  }
}