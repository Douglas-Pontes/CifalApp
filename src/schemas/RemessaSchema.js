export default class RemessaSchema {
    static schema = {
        name: 'Remessas',
        properties: {
            NumeroRemessa: 'int',
            CodVen: 'int',
            CodProduto: 'int',
            Nome: 'string',
            Unid: 'string',
            Quantidade: 'string'
        }
    }
}