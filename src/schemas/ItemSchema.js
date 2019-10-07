export default class ItemSchema {
    static schema = {
        name: 'ItensInventario',
        primaryKey: 'CodProduto',
        properties: {
            CodProduto: 'int',
            InventarioId: 'string',
            Desceq: 'string',
            Unideq: 'string',
            Estoque: 'string',
            PerVista: 'string'
        }
    }
}