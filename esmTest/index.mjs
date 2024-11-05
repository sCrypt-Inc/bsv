import * as bsvO from '@scrypt-inc/bsv'

const bsv = bsvO.default;
console.log('bsv', bsv.version)

var pubkey = new bsv.PublicKey('0485e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b00' +
    '4833fef26c8be4c4823754869ff4e46755b85d851077771c220e2610496a29d98')
console.log('pubkey', pubkey.toAddress().toString())
var a = bsv.Address.fromPublicKey(pubkey, 'livenet')

if(a.toString() !== '16JXnhxjJUhxfyx4y6H4sFcxrgt8kQ8ewX') {
    throw new Error('invalid a address:' + a.toString())
}


var b = new bsv.Address(pubkey, 'testnet', 'pubkeyhash')

if(b.toString() !== 'mkpV5m3i7W9DT6RggfFShAqHigUqfR4Fde') {
    throw new Error('invalid b address:' + b.toString())
}

