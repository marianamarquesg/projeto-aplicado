
import Select from 'react-select';
import { useState } from 'react';


function CadastroObra() {

    const options = [
        { value: 'reforma', label: 'Reforma da Escola Municipal' },
        { value: 'posto', label: 'Construção do Posto de Saúde' },
        { value: 'avenida', label: 'Duplicação da Avenida Central' },
        { value: 'praca', label: 'Obra da Praça do Bairro' },
        { value: 'creche', label: 'Construção de Creche Municipal' },
      ];
      const [selectedOption, setSelectedOption] = useState(null);
      const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log('Obra selecionada:', selectedOption);
      };
    

    return (
        <section className="modal-cadastro-obra">
            <h3>Criar nova obra</h3>
            <div class='inputs-cadastro-obra'>
            
                    <label>Nome da Obra</label>
                    <input type="text"></input>
             
                    <label>Responsável Técnico</label>
                    <Select class='input-picklist' value={selectedOption} onChange={handleChange} options={options} placeholder="Selecione um responsável" isSearchable isClearable/>


                    <label>Prazo Estimado (dias)</label>
                    <input></input>

                    <label>Data Final</label>
                    <input></input>
           
            </div>

        </section>
    )
}
export default CadastroObra;
