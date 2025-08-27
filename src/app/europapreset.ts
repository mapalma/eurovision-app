
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const originalHeaderCell = Aura.components?.datatable?.headerCell || {};
const originalAccordionContent = Aura.components?.accordion?.content || {};
const auraDatatable = {
  ...Aura.components?.datatable,
  headerCell: {
    ...originalHeaderCell,
    background: '{teal.500}',
    selectedBackground: '{teal.600}',
    hoverBackground: '{teal.600}',
    color:'white',
    hoverColor:'white',
    selectedColor: 'white',
    padding: originalHeaderCell.padding,
  } 
};

const auraAccordion = {
  ...Aura.components?.accordion,
  content: {
    ...originalAccordionContent,
    padding: '1rem',
  } 
};

//usa slate para la
const EuropaPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{teal.50}',
            100: '{teal.100}',
            200: '{teal.200}',
            300: '{teal.300}',
            400: '{teal.400}',
            500: '{teal.500}',
            600: '{teal.600}',
            700: '{teal.700}',
            800: '{teal.800}',
            900: '{teal.900}',
            950: '{teal.950}'
        }
    },
   components: {
        datatable: auraDatatable,
        accordion: auraAccordion
    }
});

export {EuropaPreset};