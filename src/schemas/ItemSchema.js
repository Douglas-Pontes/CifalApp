export default class ItemSchema {
    static schema = {
        name: 'ItensInventario',
        primaryKey: 'CodProduto',
        properties: {
            CodProduto: 'string',
            InventarioId: 'string',
            Desceq: 'string',
            Unideq: 'string',
            Estoque: 'string',
            PerVista: 'string'
        }
    }
}