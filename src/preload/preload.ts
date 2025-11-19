import { contextBridge, ipcRenderer } from 'electron';

// API segura expuesta al proceso de renderizado
export const api = {
  // Base de datos
  db: {
    // Sales
    getSales: () => ipcRenderer.invoke('db:getSales'),
    addSal: (sal: any) => ipcRenderer.invoke('db:addSal', sal),
    updateSal: (id: number, sal: any) => ipcRenderer.invoke('db:updateSal', id, sal),
    deleteSal: (id: number) => ipcRenderer.invoke('db:deleteSal', id),
    
    // Sectores
    getSectores: () => ipcRenderer.invoke('db:getSectores'),
    addSector: (sector: any) => ipcRenderer.invoke('db:addSector', sector),
    
    // Formulaciones
    getFormulaciones: () => ipcRenderer.invoke('db:getFormulaciones'),
    saveFormulacion: (form: any) => ipcRenderer.invoke('db:saveFormulacion', form),
    
    // Campañas
    getCampanias: () => ipcRenderer.invoke('db:getCampanias'),
    addCampania: (camp: any) => ipcRenderer.invoke('db:addCampania', camp),
  },

  // Cálculos
  solver: {
    solve: (params: any) => ipcRenderer.invoke('solver:solve', params),
    calcEC: (ppm: any) => ipcRenderer.invoke('solver:calcEC', ppm),
  },

  // Exportación
  export: {
    toPDF: (data: any) => ipcRenderer.invoke('export:pdf', data),
    toCSV: (data: any) => ipcRenderer.invoke('export:csv', data),
    toXLSX: (data: any) => ipcRenderer.invoke('export:xlsx', data),
  },
};

// Exponer la API al renderer
contextBridge.exposeInMainWorld('electron', api);