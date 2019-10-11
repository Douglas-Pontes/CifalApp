export default class AtendimentoSchema {
    static schema = {
        name: 'Produtos',
        properties: {
            CodProduto: 'int',
            Desceq: 'string',
            Unideq: 'string',
            Estoque: 'string',
            PerVista: 'string',
            CodEan14: 'string'
        }
    }
}