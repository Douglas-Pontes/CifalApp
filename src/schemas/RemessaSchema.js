export default class RemessaSchema {
    static schema = {
        name: 'Remessas',
        properties: {
            NumeroRemessa: 'int',
            CodVen: 'int',
            CodProduto: 'int',
            Unid: 'string',
            Quantidade: 'string'
        }
    }
}