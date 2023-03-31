const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const contact = await prisma.contact.createMany({
    data: [
      {
        name: 'Tancredo',
        lastName: 'Amador',
        number: 91476550,
        email: 'TancredoVillalobosAmador@jourrapide.com'
      },
      {
        name: 'Farisa',
        lastName: 'Cerda',
        number: 91815992,
        email: 'FarisaCasaresCerda@teleworm.us'
      },
      {
        name: 'Eustasio',
        lastName: 'Villaseñor',
        number: 95952588,
        email: 'EustasioRoblesVillasenor@teleworm.us'
      },
      {
        name: 'Flaminio',
        lastName: 'Casárez',
        number: 99571934,
        email: 'FlaminioPalaciosCasarez@jourrapide.com'
      },
      {
        name: 'Dustin',
        lastName: 'Juárez',
        number: 91915831,
        email: 'DustinBotelloJuarez@dayrep.com'
      },
      {
        name: 'Morfeo',
        lastName: 'Marcos',
        number: 91997671,
        email: 'MorfeoCardenasMarcos@teleworm.us'
      },
      {
        name: 'Calístrato',
        lastName: 'Cotto',
        number: 96788687,
        email: 'CalistratoArevaloCotto@teleworm.us'
      },
      {
        name: 'Layla',
        lastName: 'Alcantar',
        number: 96570525,
        email: 'LaylaOrtizAlcantar@rhyta.com'
      },
      {
        name: 'Gulmen',
        lastName: 'Nevarez',
        number: 91792894,
        email: 'GulmenMenchacaNevarez@teleworm.us'
      },
      {
        name: 'Dario',
        lastName: 'Cervántez',
        number: 93807605,
        email: 'DarioSanabriaCervantez@jourrapide.com'
      }
    ]
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })