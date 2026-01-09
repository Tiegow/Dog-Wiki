export const mapApiToBreed = (data) => {
    const pesoMacho = (data.attributes.male_weight.max + data.attributes.male_weight.min) / 2;
    const pesoFemea = (data.attributes.female_weight.max + data.attributes.female_weight.min) / 2;
    const pesoMedio = (pesoMacho + pesoFemea) / 2;
  
    return {
      id: data.id,
      name: data.attributes.name,
      description: data.attributes.description,
      lifeMin: data.attributes.life.min,
      lifeMax: data.attributes.life.max,
      isHypoallergenic: data.attributes.hypoallergenic,
      averageWeight: pesoMedio.toFixed(1),
      lifeSpanLabel: `${data.attributes.life.min} - ${data.attributes.life.max} anos`
    };
};