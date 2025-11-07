// ========================================
// CLIENTES - JAVASCRIPT
// ========================================

// Dados dos clientes (baseado na planilha fornecida)
let clientesData = [
    {
        id: 1,
        nomeFantasia: "Boutique Best Beef",
        nomeCliente: "Ticiane",
        telefone: "55 9 9964-9192",
        endereco: "R. Floriano Peixoto, 2004 - Centro, Santa Maria - RS, 97015-372",
        status: "Ativo",
        ultimoContato: "2025-10-23",
        observacoes: ""
    },
    {
        id: 2,
        nomeFantasia: "Calabouço Academia",
        nomeCliente: "Paula Arruda",
        telefone: "55 9 9914-4142",
        endereco: "R. Tuiuti, 920 - Nossa Sra. de Fátima, Santa Maria - RS, 97015-660",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 3,
        nomeFantasia: "Coopercedro",
        nomeCliente: "",
        telefone: "55 9 9202-6718",
        endereco: "Praça Saturnino de Brito, Rua Dr. Bozano",
        status: "Ativo",
        ultimoContato: "2025-10-23",
        observacoes: ""
    },
    {
        id: 4,
        nomeFantasia: "Di Torriani",
        nomeCliente: "Cibele",
        telefone: "55 9 9185-5790",
        endereco: "Av. Pref. Evandro Behr, 4281 - Camobi, Santa Maria - RS, 97110-800",
        status: "Ativo",
        ultimoContato: "2025-10-23",
        observacoes: ""
    },
    {
        id: 5,
        nomeFantasia: "Divina Fruteira",
        nomeCliente: "Allan",
        telefone: "55 9 9218-5845",
        endereco: "Av. Osvaldo Cruz, 206 - Nossa Sra. das Dores, Santa Maria - RS, 97095-470",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 6,
        nomeFantasia: "Doce Amaro",
        nomeCliente: "Vandir",
        telefone: "55 9 9140-4809",
        endereco: "R. Venâncio Aires, 1366 - Loja 2B - Centro, Santa Maria - RS, 97010-003",
        status: "Ativo",
        ultimoContato: "2025-10-17",
        observacoes: "8 x 250"
    },
    {
        id: 7,
        nomeFantasia: "Empório Belga",
        nomeCliente: "Cris/ Daniel",
        telefone: "55 9 9997-3507",
        endereco: "Rua André Marques, 119 - Centro, Santa Maria - RS, 97010-041",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 8,
        nomeFantasia: "Fruteira do Chico",
        nomeCliente: "Emerson",
        telefone: "55 9162-1422",
        endereco: "Av. Pref. Evandro Behr, 4907 - Camobi, Santa Maria - RS, 97110-800",
        status: "Ativo",
        ultimoContato: "",
        observacoes: "visitar"
    },
    {
        id: 9,
        nomeFantasia: "Frutila",
        nomeCliente: "",
        telefone: "",
        endereco: "Av. Fernando Ferrari, 1090 - Nossa Sra. de Lourdes, Santa Maria - RS, 97050-800",
        status: "Ativo",
        ultimoContato: "",
        observacoes: "visitar"
    },
    {
        id: 10,
        nomeFantasia: "Gran Reserva",
        nomeCliente: "Guilherme",
        telefone: "55 9 992-0108",
        endereco: "R. João Batista da Cruz Jobim, 304 - Nossa Sra. Medianeira, Santa Maria - RS, 97060-330",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 11,
        nomeFantasia: "Hamani",
        nomeCliente: "Aline/ Marcia",
        telefone: "55 9 9685-9055",
        endereco: "R. Venâncio Aires, 1395 - Centro, Santa Maria - RS, 97015-680",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 12,
        nomeFantasia: "Imperial Fresh Food",
        nomeCliente: "Carol",
        telefone: "55 9 9221-8888",
        endereco: "R. Venâncio Aires, 2050 - Centro, Santa Maria - RS, 97010-001",
        status: "Ativo",
        ultimoContato: "2025-10-14",
        observacoes: "café recolhido"
    },
    {
        id: 13,
        nomeFantasia: "La Pimenta",
        nomeCliente: "Roberto",
        telefone: "55 9 9717-8160",
        endereco: "Av. Pref. Evandro Behr, 6449 - Camobi, Santa Maria - RS, 97110-620",
        status: "Ativo",
        ultimoContato: "",
        observacoes: "ver boletos"
    },
    {
        id: 14,
        nomeFantasia: "La Santa (Shopping Royal Plazza)",
        nomeCliente: "Allana/ Alexandre",
        telefone: "55 9 9194-1836",
        endereco: "Av. Nossa Sra. das Dores, 305 - Loja 158 - Nossa Sra. das Dores, Santa Maria - RS, 97050-530",
        status: "Ativo",
        ultimoContato: "2025-10-23",
        observacoes: "5kg"
    },
    {
        id: 15,
        nomeFantasia: "La Santa Café e Bistro (Conteiner)",
        nomeCliente: "Allana/ Alexandre",
        telefone: "55 9 9194-1836",
        endereco: "R. Serafim Valandro, 1750 - Centro, Santa Maria - RS, 97015-630",
        status: "Ativo",
        ultimoContato: "2025-10-23",
        observacoes: "5kg"
    },
    {
        id: 16,
        nomeFantasia: "Nibs",
        nomeCliente: "Deise",
        telefone: "55 9 8464-4340",
        endereco: "R. Jorge Pedro Abelin, 284 - Nossa Sra. de Lourdes, Santa Maria - RS, 97050-390",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 17,
        nomeFantasia: "Padaria Pão Quentinho",
        nomeCliente: "Laura",
        telefone: "55 9 9681-1520",
        endereco: "Av. Prefeito Evaldo Behr, 545. Sala 04 - Parque Residencial Novo Horizonte - Santa Maria - RS - 97110-801",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 18,
        nomeFantasia: "Padaria Phoenix",
        nomeCliente: "Guilherme",
        telefone: "55 9 9677-5665",
        endereco: "Av. João Machado Soares, 2164 - Camobi, Santa Maria - RS, 97110-000",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 19,
        nomeFantasia: "Panhoca",
        nomeCliente: "Adriana",
        telefone: "",
        endereco: "Av. Pres. Vargas, 448 - Patronato, Santa Maria - RS, 97020-001",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 20,
        nomeFantasia: "Pomar Fruteira",
        nomeCliente: "Roger",
        telefone: "",
        endereco: "R. Pinto Bandeira - Nossa Sra. de Lourdes, Santa Maria - RS, 97050-610",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 21,
        nomeFantasia: "Quitanda Market",
        nomeCliente: "",
        telefone: "",
        endereco: "Estabelecimentos que possuem Quitanda Market",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 22,
        nomeFantasia: "Reduto da Barba",
        nomeCliente: "Bruno",
        telefone: "55 9 9125-4454",
        endereco: "Av. Nossa Sra. das Dores, 101 - Nossa Sra. das Dores, Santa Maria - RS, 97090-000",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 23,
        nomeFantasia: "Seu Pedro Bolicho",
        nomeCliente: "",
        telefone: "55 9 9981-9990",
        endereco: "BR-287, 4743 - Camobi, Santa Maria - RS, 97105-198",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 24,
        nomeFantasia: "Thru Café",
        nomeCliente: "Luis",
        telefone: "55 9 9648-4083",
        endereco: "Av. Nossa Senhora Medianeira, Av. Nossa Sra. das Dores, 2376, Santa Maria - RS, 97060-001",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 25,
        nomeFantasia: "Verdito",
        nomeCliente: "Deise",
        telefone: "55 9 9930-7473",
        endereco: "R. Pinheiro Machado, 2366 - Segundo Andar - Sala 206 e 207 - Centro, Santa Maria - RS, 97050-600",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    },
    {
        id: 26,
        nomeFantasia: "Di Bento",
        nomeCliente: "",
        telefone: "",
        endereco: "R. Benjamin Constant, 1242 - Centro, Santa Maria - RS, 97050-022",
        status: "Ativo",
        ultimoContato: "",
        observacoes: ""
    }
];

// Variáveis globais
let clientesFiltrados = [...clientesData];
let clienteEditando = null;
let sortDirection = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
    configurarEventListeners();
});

// Inicializar página
function inicializarPagina() {
    carregarClientes();
    atualizarEstatisticas();
    salvarNoLocalStorage();
}

// Configurar event listeners
function configurarEventListeners() {
    // Filtros
    document.getElementById('searchInput').addEventListener('input', filtrarClientes);
    document.getElementById('statusFilter').addEventListener('change', filtrarClientes);
    
    // Modal
    document.getElementById('clientForm').addEventListener('submit', salvarCliente);
    
    // Click fora do modal para fechar
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('clientModal');
        if (event.target === modal) {
            fecharModal();
        }
    });
}

// Carregar clientes na tabela
function carregarClientes() {
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = '';
    
    if (clientesFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    Nenhum cliente encontrado
                </td>
            </tr>
        `;
        return;
    }
    
    clientesFiltrados.forEach((cliente, index) => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 0.05}s`;
        
        row.innerHTML = `
            <td><strong>${cliente.nomeFantasia}</strong></td>
            <td>${cliente.nomeCliente}</td>
            <td>${formatarTelefone(cliente.telefone)}</td>
            <td>${cliente.endereco}</td>
            <td>${criarBadgeStatus(cliente.status)}</td>
            <td>${formatarData(cliente.ultimoContato)}</td>
            <td class="obs-cell">${cliente.observacoes}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editarCliente(${cliente.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn contact" onclick="contatarCliente('${cliente.telefone}')" title="Contatar">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="action-btn delete" onclick="confirmarExclusao(${cliente.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Filtrar clientes
function filtrarClientes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    clientesFiltrados = clientesData.filter(cliente => {
        const matchSearch = !searchTerm || 
            cliente.nomeFantasia.toLowerCase().includes(searchTerm) ||
            cliente.nomeCliente.toLowerCase().includes(searchTerm) ||
            cliente.telefone.toLowerCase().includes(searchTerm) ||
            cliente.endereco.toLowerCase().includes(searchTerm) ||
            cliente.observacoes.toLowerCase().includes(searchTerm);
        
        const matchStatus = !statusFilter || cliente.status === statusFilter;
        
        return matchSearch && matchStatus;
    });
    
    carregarClientes();
    atualizarEstatisticas();
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = '';
    clientesFiltrados = [...clientesData];
    carregarClientes();
    atualizarEstatisticas();
}

// Ordenar tabela
function sortTable(columnIndex) {
    const columns = ['nomeFantasia', 'nomeCliente', 'telefone', 'endereco', 'status', 'ultimoContato'];
    const column = columns[columnIndex];
    
    if (!sortDirection[column]) {
        sortDirection[column] = 'asc';
    } else {
        sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    }
    
    clientesFiltrados.sort((a, b) => {
        let valueA = a[column] || '';
        let valueB = b[column] || '';
        
        // Tratamento especial para datas
        if (column === 'ultimoContato') {
            valueA = valueA ? new Date(valueA) : new Date(0);
            valueB = valueB ? new Date(valueB) : new Date(0);
        } else {
            valueA = valueA.toString().toLowerCase();
            valueB = valueB.toString().toLowerCase();
        }
        
        if (sortDirection[column] === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    carregarClientes();
    
    // Atualizar ícones de ordenação
    document.querySelectorAll('.clients-table th i').forEach(icon => {
        icon.className = 'fas fa-sort';
    });
    
    const currentIcon = document.querySelectorAll('.clients-table th')[columnIndex].querySelector('i');
    currentIcon.className = `fas fa-sort-${sortDirection[column] === 'asc' ? 'up' : 'down'}`;
}

// Adicionar cliente
function adicionarCliente() {
    clienteEditando = null;
    document.getElementById('modalTitle').textContent = 'Novo Cliente';
    limparFormulario();
    document.getElementById('clientModal').style.display = 'block';
}

// Editar cliente
function editarCliente(id) {
    clienteEditando = clientesData.find(c => c.id === id);
    if (!clienteEditando) return;
    
    document.getElementById('modalTitle').textContent = 'Editar Cliente';
    preencherFormulario(clienteEditando);
    document.getElementById('clientModal').style.display = 'block';
}

// Salvar cliente
function salvarCliente(event) {
    event.preventDefault();
    
    const formData = {
        nomeFantasia: document.getElementById('nomeFantasia').value,
        nomeCliente: document.getElementById('nomeCliente').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        status: document.getElementById('status').value,
        ultimoContato: document.getElementById('ultimoContato').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    if (clienteEditando) {
        // Atualizar cliente existente
        Object.assign(clienteEditando, formData);
    } else {
        // Adicionar novo cliente
        const novoId = Math.max(...clientesData.map(c => c.id)) + 1;
        clientesData.push({
            id: novoId,
            ...formData
        });
    }
    
    fecharModal();
    filtrarClientes();
    atualizarEstatisticas();
    salvarNoLocalStorage();
    
    // Mostrar notificação
    mostrarNotificacao(clienteEditando ? 'Cliente atualizado com sucesso!' : 'Cliente adicionado com sucesso!');
}

// Confirmar exclusão
function confirmarExclusao(id) {
    const cliente = clientesData.find(c => c.id === id);
    if (!cliente) return;
    
    if (confirm(`Tem certeza que deseja excluir o cliente "${cliente.nomeFantasia}"?`)) {
        excluirCliente(id);
    }
}

// Excluir cliente
function excluirCliente(id) {
    clientesData = clientesData.filter(c => c.id !== id);
    filtrarClientes();
    atualizarEstatisticas();
    salvarNoLocalStorage();
    mostrarNotificacao('Cliente excluído com sucesso!');
}

// Contatar cliente
function contatarCliente(telefone) {
    if (!telefone) {
        alert('Telefone não cadastrado para este cliente.');
        return;
    }
    
    const numeroLimpo = telefone.replace(/\D/g, '');
    const url = `https://wa.me/55${numeroLimpo}`;
    window.open(url, '_blank');
}

// Fechar modal
function fecharModal() {
    document.getElementById('clientModal').style.display = 'none';
    limparFormulario();
}

// Limpar formulário
function limparFormulario() {
    document.getElementById('clientForm').reset();
}

// Preencher formulário
function preencherFormulario(cliente) {
    document.getElementById('nomeFantasia').value = cliente.nomeFantasia;
    document.getElementById('nomeCliente').value = cliente.nomeCliente;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('endereco').value = cliente.endereco;
    document.getElementById('status').value = cliente.status;
    document.getElementById('ultimoContato').value = cliente.ultimoContato;
    document.getElementById('observacoes').value = cliente.observacoes;
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    const total = clientesData.length;
    const ativos = clientesData.filter(c => c.status === 'Ativo').length;
    const recentes = clientesData.filter(c => {
        if (!c.ultimoContato) return false;
        const ultimoContato = new Date(c.ultimoContato);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - ultimoContato);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }).length;
    
    const pendencias = clientesData.filter(c => 
        c.observacoes.toLowerCase().includes('visitar') ||
        c.observacoes.toLowerCase().includes('boleto') ||
        c.observacoes.toLowerCase().includes('recolhido')
    ).length;
    
    document.getElementById('totalClientes').textContent = total;
    document.getElementById('clientesAtivos').textContent = ativos;
    document.getElementById('contatosRecentes').textContent = recentes;
    document.getElementById('pendencias').textContent = pendencias;
}

// Exportar dados
function exportarDados() {
    const csv = gerarCSV();
    baixarCSV(csv, 'clientes_mestres_cafe.csv');
}

// Gerar CSV
function gerarCSV() {
    const headers = ['Nome Fantasia', 'Nome do Cliente', 'Telefone', 'Endereço', 'Status', 'Último Contato', 'Observações'];
    const rows = clientesData.map(cliente => [
        cliente.nomeFantasia,
        cliente.nomeCliente,
        cliente.telefone,
        cliente.endereco,
        cliente.status,
        cliente.ultimoContato,
        cliente.observacoes
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

// Baixar CSV
function baixarCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Funções utilitárias
function formatarTelefone(telefone) {
    if (!telefone) return '-';
    return telefone;
}

function formatarData(data) {
    if (!data) return '-';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

function criarBadgeStatus(status) {
    const statusLower = status.toLowerCase();
    return `<span class="status-badge status-${statusLower}">${status}</span>`;
}

function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;
    notification.textContent = mensagem;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Salvar no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem('mestres_cafe_clientes', JSON.stringify(clientesData));
}

// Carregar do localStorage
function carregarDoLocalStorage() {
    const dados = localStorage.getItem('mestres_cafe_clientes');
    if (dados) {
        clientesData = JSON.parse(dados);
        clientesFiltrados = [...clientesData];
    }
}

// Carregar dados salvos na inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarDoLocalStorage();
});