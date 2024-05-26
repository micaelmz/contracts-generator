import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Chip, Input, OutlinedInput, useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import SearchOffIcon from '@mui/icons-material/SearchOff';

function CustomTabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{p: 3}}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const steps = ['Parâmetros da URL', 'Parâmetros de Body', 'Headers', 'Respostas de Sucesso', 'Respostas de Erro'];

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [objectProperties, setObjectProperties] = useState([{name: '', type: ''}]);
  const [urlParameters, setUrlParameters] = useState([]);
  const [bodyParameters, setBodyParameters] = useState([]);
  const [headers, setHeaders] = useState([{name: 'Content-Type', value: 'application/json'}]);
  const [successResponse, setSuccessResponse] = useState({code: '200', content: ''});
  const [errorResponses, setErrorResponses] = useState([{code: '', content: ''}]);
  const [activeStep, setActiveStep] = useState(0);
  const [methodsSelected, setMethodsSelected] = useState([]);
  const [currentMethod, setCurrentMethod] = useState(0);
  const [info, setInfo] = useState({name: '', description: ''});

  const [requests, setRequests] = useState({
    GET: {
      urlParameters: [],
      bodyParameters: [],
      headers: [{name: 'Content-Type', value: 'application/json'}],
      successResponse: {},
      errorResponses: []
    },
    POST: {
      urlParameters: [],
      bodyParameters: [],
      headers: [{name: 'Content-Type', value: 'application/json'}],
      successResponse: {},
      errorResponses: []
    },
    PUT: {
      urlParameters: [],
      bodyParameters: [],
      headers: [{name: 'Content-Type', value: 'application/json'}],
      successResponse: {},
      errorResponses: []
    },
    PATCH: {
      urlParameters: [],
      bodyParameters: [],
      headers: [{name: 'Content-Type', value: 'application/json'}],
      successResponse: {},
      errorResponses: []
    },
    DELETE: {
      urlParameters: [],
      bodyParameters: [],
      headers: [{name: 'Content-Type', value: 'application/json'}],
      successResponse: {},
      errorResponses: []
    }
  });

  const methods = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ];

  const handleChangeInfo = (event) => {
    setInfo({...info, [event.target.name]: event.target.value});
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleObjectPropertyChange = (index, event) => {
    const values = [...objectProperties];
    values[index][event.target.name] = event.target.value;
    setObjectProperties(values);
  };

  const handleUrlParameterChange = (index, event) => {
    const values = [...urlParameters];
    if (event.target.name === 'required') {
      values[index][event.target.name] = event.target.checked;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setUrlParameters(values);
  };

  const handleBodyParameterChange = (index, event) => {
    const values = [...bodyParameters];
    if (event.target.name === 'required') {
      values[index][event.target.name] = event.target.checked;
    } else {
      values[index][event.target.name] = event.target.value;
    }
    setBodyParameters(values);
  };

  const handleHeaderChange = (index, event) => {
    const values = [...headers];
    values[index][event.target.name] = event.target.value;
    setHeaders(values);
  };

  const handleSuccessResponseChange = (event) => {
    setSuccessResponse({...successResponse, [event.target.name]: event.target.value});
  }

  const handleErrorResponseChange = (index, event) => {
    const values = [...errorResponses];
    values[index][event.target.name] = event.target.value;
    setErrorResponses(values);
  };

  const addObjectProperty = () => {
    setObjectProperties([...objectProperties, {name: '', type: ''}]);
  };

  const addUrlParameter = () => {
    setUrlParameters([...urlParameters, {name: '', type: '', required: false}]);
  };

  const addBodyParameter = () => {
    setBodyParameters([...bodyParameters, {property: ''}]);
  };

  const addHeader = () => {
    setHeaders([...headers, {name: '', value: ''}]);
  };

  const addOAuth = () => {
    addUnauthorizedResponse();
    if (!headers.find(header => header.name === 'Authorization'))
      setHeaders([...headers, {name: 'Authorization', value: "Bearer <OAuth Token>"}]);
  };

  const addErrorResponse = () => {
    setErrorResponses([...errorResponses, {code: '', content: ''}]);
  };

  const addNotFoundResponse = () => {
    if (!errorResponses.find(error => error.code === '404')) {
      if (errorResponses[0].code === '' && errorResponses[0].content === '') {
        setErrorResponses([{code: '404', content: '{"error": "Not Found"}'}]);
      } else {
        setErrorResponses([...errorResponses, {code: '404', content: '{"error": "Not Found"}'}]);
      }
    }
  };

  const addUnauthorizedResponse = () => {
    if (!errorResponses.find(error => error.code === '401')) {
      if (errorResponses[0].code === '' && errorResponses[0].content === '') {
        setErrorResponses([{code: '401', content: '{"error": "Unauthorized"}'}]);
      } else {
        setErrorResponses([...errorResponses, {code: '401', content: '{"error": "Unauthorized"}'}]);
      }
    }
  };

  const resetAllSteps = () => {
    setActiveStep(0);
    setUrlParameters([]);
    setBodyParameters([]);
    setHeaders([{name: 'Content-Type', value: 'application/json'}]);
    setErrorResponses([{code: '', content: ''}]);
    setSuccessResponse({code: '200', content: ''});
  }

  const getPropertyOptions = () => {
    return objectProperties.map((property, index) => (
        <MenuItem key={index} value={property.name}>
          {property.name} ({property.type})
        </MenuItem>
    ));
  };

  const moveToNextMethod = () => {
    if (currentMethod < methodsSelected.length - 1) {
      resetAllSteps();
      setCurrentMethod(currentMethod + 1);
    } else {
      createMDFile();
    }
  }

  const handleNext = () => {

    setRequests({
      ...requests, [methodsSelected[currentMethod]]: {
        urlParameters: urlParameters,
        bodyParameters: bodyParameters,
        headers: headers,
        successResponse: successResponse,
        errorResponses: errorResponses
      }

    })

    if (activeStep === steps.length - 1) {
      // chegou no ultimo passo deste método
      moveToNextMethod();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const downloadRequests = () => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(requests, null, 2)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'requests.json';
    a.click();
  }

  const createMDFile = () => {
    let output = `# ${info.name}\n\n${info.description}\n\n`;

    output += `## Propriedades\n\n`;
    output += `Os atributos de ${info.name} é definido por:\n\n`;
    output += `\`\`\`json\n{\n`;
    objectProperties.forEach((property, index) => {
      output += `\t"${property.name}": "${property.type}"`;
      if (index < objectProperties.length - 1) {
        output += ',\n';
      }
    });
    output += `\n }\n\`\`\`\n\n`;

    
    methodsSelected.forEach(method => {
      output += `## ${method} /${info.name}\n\n`;

      const req = requests[method];

      if (req.urlParameters.length > 0) {
        output += `### Parâmetros da URL\n\n`;
        req.urlParameters.forEach(param => {
          // output += `- \`${param.name}\` (${param.type}) - ${param.required ? 'Obrigatório' : 'Opcional'}\n`;
          output += `- ${param.required ? 'Required' : 'Optional'}: \`${param.name}=[${param.type}]\`\n`;
        });
        output += '\n';
      }

      if (req.bodyParameters.length > 0) {
        output += `### Parâmetros de Body\n\n`;
        req.bodyParameters.forEach(param => {
          // output += `- \`${param.name}\` (${param.type}) - ${param.required ? 'Obrigatório' : 'Opcional'}\n`;
          let paramObj = objectProperties.find(prop => prop.name === param.property);
          if (paramObj) {
            output += `- ${param.required ? 'Required' : 'Optional'}: \`${paramObj.name}=[${paramObj.type}]\`\n`;
          }
        });


        output += '\n';
      }

      if (req.headers.length > 0) {
        output += `### Headers\n\n`;
        req.headers.forEach(header => {
          output += `- ${header.name}: ${header.value}\n`;
        });
        output += '\n';
      }

      if (req.successResponse && req.successResponse.code) {
        output += `### Respostas de Sucesso\n\n`;
        output += `- Código HTTP: ${req.successResponse.code}\n`;
        output += `- Content:\n\n\`\`\`json\n${req.successResponse.content}\n\`\`\`\n\n`;
      }

      if (req.errorResponses.length > 0) {
        output += `### Respostas de Erro\n\n`;
        req.errorResponses.forEach(error => {
          output += `- Código HTTP: ${error.code}\n`;
          output += `- Content:\n\n\`\`\`json\n${error.content}\n\`\`\`\n\n`;
        });
      }
    });

    const element = document.createElement('a');
    const file = new Blob([output], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${info.name}.md`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    console.log(output);
  }

  const handleChangeChips = (event) => {
    const {
      target: {value},
    } = event;
    setMethodsSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  }

  return (
      <Box sx={{width: '100%'}}>
        <Box sx={{width: '70%', backgroundColor: "#ccc", borderRadius: "10px", margin: '5rem auto'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Component" {...a11yProps(0)} />
              <Tab label="Endpoint" {...a11yProps(1)} />
              <Tab label="Component AI" {...a11yProps(2)} />
              <Tab label="Endpoint AI" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TextField name="name" value={info.name} onChange={(e) => {handleChangeInfo(e)}}  label="Endpoint" sx={{width: "21%", marginRight: "2%"}}/>
            <TextField name="description" value={info.description} onChange={(e) => {handleChangeInfo(e)}} label="Descrição" sx={{width: "77%"}}/>
            <FormControl sx={{mt: 1, width: "100%"}}>
              <InputLabel id="demo-multiple-chip-label">Selecione os metodos HTTP</InputLabel>
              <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={methodsSelected}
                  onChange={handleChangeChips}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                  renderValue={(selected) => (
                      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                      </Box>
                  )}
                  MenuProps={MenuProps}
              >
                {methods.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                      {name}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            <h3>Propriedades do Objeto</h3>
            {objectProperties.map((property, index) => (
                <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <TextField
                      label="Nome"
                      name="name"
                      value={property.name}
                      onChange={(e) => handleObjectPropertyChange(index, e)}
                      sx={{mr: 2, flexGrow: 1}}
                  />
                  <FormControl sx={{minWidth: 120}}>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        label="Tipo"
                        name="type"
                        value={property.type}
                        onChange={(e) => handleObjectPropertyChange(index, e)}
                    >
                      <MenuItem value="int">int</MenuItem>
                      <MenuItem value="float">float</MenuItem>
                      <MenuItem value="string">string</MenuItem>
                      <MenuItem value="bool">bool</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
            ))}
            <Button variant="contained" startIcon={<AddIcon/>} onClick={addObjectProperty}>
              Adicionar Propriedade
            </Button>

            <hr style={{margin: "2rem"}}/>

            {methodsSelected && methodsSelected.length > 0 ? (
                <>
                  <h4>Definindo contratos para o
                    método <span style={{color: "green"}}> {methodsSelected[currentMethod]}</span></h4>
                  <Stepper sx={{mb: "3rem", mt: "2rem"}} activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                  </Stepper>

                  {activeStep === steps.length ? (
                      <div>
                        <Typography sx={{mt: 3, mb: 1}}>
                          Todas as etapas foram concluídas
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                          <Box sx={{flex: '1 1 auto'}}/>
                          <Button onClick={handleBack}>Voltar</Button>
                        </Box>
                      </div>
                  ) : (
                      <div>
                        {activeStep === 0 && (
                            <div>
                              <h3>Parâmetros da URL</h3>
                              {urlParameters && urlParameters.length > 0 ? (
                                  urlParameters.map((param, index) => (
                                      <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        <TextField
                                            label="Nome"
                                            name="name"
                                            value={param.name}
                                            onChange={(e) => handleUrlParameterChange(index, e)}
                                            sx={{mr: 2, flexGrow: 1}}
                                        />
                                        <FormControl sx={{minWidth: 120}}>
                                          <InputLabel>Tipo</InputLabel>
                                          <Select
                                              label="Tipo"
                                              name="type"
                                              value={param.type}
                                              onChange={(e) => handleUrlParameterChange(index, e)}
                                          >
                                            <MenuItem value="int">int</MenuItem>
                                            <MenuItem value="float">float</MenuItem>
                                            <MenuItem value="string">string</MenuItem>
                                            <MenuItem value="bool">bool</MenuItem>
                                          </Select>
                                        </FormControl>
                                        <FormControlLabel
                                            control={
                                              <Switch checked={param.required} onChange={(e) => handleUrlParameterChange(index, e)} name="required"/>}
                                            label="Obrigatório"
                                            sx={{ml: 2}}
                                        />
                                      </Box>
                                  ))
                              ) : (
                                  <h4>Nenhum parâmetro de URL adicionado</h4>
                              )}
                              <Button variant="contained" startIcon={<AddIcon/>} onClick={addUrlParameter}>
                                Adicionar Parâmetro
                              </Button>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div>
                              <h3>Parâmetros de Body</h3>
                              {bodyParameters && bodyParameters.length > 0 ? (
                                  bodyParameters.map((param, index) => (
                                      <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        <FormControl sx={{minWidth: 200, mr: 2}}>
                                          <InputLabel>Propriedade</InputLabel>
                                          <Select
                                              label="Propriedade"
                                              name="property"
                                              value={param.property}
                                              onChange={(e) => handleBodyParameterChange(index, e)}
                                          >
                                            {getPropertyOptions()}
                                          </Select>
                                        </FormControl>
                                        <TextField
                                            value={param.property}
                                            sx={{flexGrow: 1}}
                                            disabled
                                        />
                                        <FormControlLabel control={<Switch checked={param.required} onChange={(e) => handleBodyParameterChange(index, e)} name="required"/>}
                                                          label="Obrigatório" sx={{ml: 2}}/>
                                      </Box>
                                  ))
                              ) : (
                                  <h4>Nenhuma propriedade de objeto adicionada</h4>
                              )}
                              <Button variant="contained" startIcon={<AddIcon/>} onClick={addBodyParameter}>
                                Adicionar Parâmetro
                              </Button>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div>
                              <h3>Headers</h3>
                              {headers.map((header, index) => (
                                  <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <TextField
                                        label="Nome"
                                        name="name"
                                        value={header.name}
                                        sx={{mr: 2, flexGrow: 1}}
                                        onChange={(e) => handleHeaderChange(index, e)}
                                    />
                                    <TextField
                                        label="Valor"
                                        name="value"
                                        value={header.value}
                                        sx={{flexGrow: 1}}
                                        onChange={(e) => handleHeaderChange(index, e)}
                                    />
                                  </Box>
                              ))}
                              <Button variant="contained" startIcon={
                                <AddIcon/>} onClick={addHeader} sx={{marginRight: "2%"}}>
                                Adicionar Header
                              </Button>
                              <Button variant="contained" startIcon={<SecurityIcon/>} onClick={addOAuth}>
                                Adicionar OAuth
                              </Button>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div>
                              <h3>Resposta de Sucesso</h3>
                              <TextField name="code" value={successResponse.code} label="Código" onChange={(e) => handleSuccessResponseChange(e)} sx={{width: "21%", marginRight: "2%"}}/>
                              <TextField name="content" value={successResponse.content} label="Conteúdo (JSON)" onChange={(e) => handleSuccessResponseChange(e)} sx={{width: "77%"}}/>
                            </div>
                        )}

                        {activeStep === 4 && (
                            <div>
                              <h3>Respostas de Erro</h3>
                              {errorResponses.map((error, index) => (
                                  <Box key={index} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                    <TextField
                                        label="Código"
                                        name="code"
                                        value={error.code}
                                        onChange={(e) => handleErrorResponseChange(index, e)}
                                        sx={{width: "21%", marginRight: "2%"}}
                                    />
                                    <TextField
                                        label="Conteúdo (JSON)"
                                        name="content"
                                        value={error.content}
                                        onChange={(e) => handleErrorResponseChange(index, e)}
                                        sx={{width: "77%"}}
                                    />
                                  </Box>
                              ))}
                              <Button variant="contained" startIcon={
                                <AddIcon/>} onClick={addErrorResponse} sx={{marginRight: "2%"}}>
                                Adicionar Resposta de Erro
                              </Button>
                              <Button variant="contained" startIcon={
                                <LockIcon/>} onClick={addUnauthorizedResponse} sx={{marginRight: "2%"}}>
                                Adicionar 401
                              </Button>
                              <Button variant="contained" startIcon={
                                <SearchOffIcon/>} onClick={addNotFoundResponse} sx={{marginRight: "2%"}}>
                                Adicionar 404
                              </Button>
                            </div>
                        )}

                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                          <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{mr: 1}}
                          >
                            Voltar
                          </Button>
                          <Box sx={{flex: '1 1 auto'}}/>
                          <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                          </Button>
                        </Box>
                      </div>
                  )}
                </>
            ) : (
                <h4>Nenhum método HTTP selecionado</h4>
            )}
          < /CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Item Four
          </CustomTabPanel>
        </Box>
      </Box>
  );
}
