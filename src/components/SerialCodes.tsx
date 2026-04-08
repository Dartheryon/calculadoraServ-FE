import Copy from './Copy'

const SerialCodes = () => {
  const codeWater = '000010482640'
  const codeHomeEnergy = '1780283-9'
  const codeLocalEnergy = '0752042-3'
  const codeGasP1 = '60858272'
  const codeGasP2 = '60858333'
  const codeGasP3 = '60858390'

  return (
    <div className="flex flex-col gap-1">
      <Copy code={codeWater} title='Acueducto' />
      <Copy code={codeHomeEnergy} title='Energía residencial' />
      <Copy code={codeLocalEnergy} title='Energía local' />
      <Copy code={codeGasP1} title='Gas Piso 1' />
      <Copy code={codeGasP2} title='Gas Piso 2' />
      <Copy code={codeGasP3} title='Gas Piso 3' />
    </div>
  )
}
export default SerialCodes