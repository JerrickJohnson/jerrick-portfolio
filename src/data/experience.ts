import type { PipelineStep, WorkGroup } from './types';

export const role = {
  title: 'Software Engineer II',
  company: 'CRC Group / Wellington Insurance Group',
  dates: 'September 2021 – Present',
  platform: ['IBM i', 'RPGLE', 'CL / CLLE', 'SQL'],
  summary:
    'I develop, enhance, and maintain enterprise insurance applications on the IBM i platform: production software that business users rely on every day, built on established systems, real data, and business rules that have to be right.',
};

export const workGroups: WorkGroup[] = [
  {
    title: 'Application Development',
    points: [
      'Develop, enhance, and maintain enterprise insurance applications using RPGLE, CL/CLLE, and SQL.',
      'Modify existing applications and files to support changing business requirements, adding new data and application functionality.',
    ],
  },
  {
    title: 'Business Reporting',
    points: [
      'Develop and maintain CL and RPGLE programs that use SQL to generate scheduled business reports and distribute recurring reporting to users.',
      'Develop monthly new-business reports for newly issued policyholders.',
    ],
  },
  {
    title: 'Production Support',
    points: [
      'Troubleshoot and resolve production issues by investigating program logic, processing flows, files, and data to find and implement the fix.',
      'Support application testing, debugging, and implementation of enhancements within an established enterprise environment.',
    ],
  },
  {
    title: 'Data & Business Rules',
    points: [
      'Make data changes and file modifications that keep applications aligned with how the business actually operates.',
      'Add and maintain data for new companies within the print environment and develop the programs that produce their documents.',
    ],
  },
];

export const catHighlight = {
  label: 'Selected engineering work',
  title: 'Texas CAT Code Assignment',
  body: 'Developed functionality that allows business users to assign Catastrophe (CAT) codes to Texas counties and regions. Implemented the application and data changes required to support the business process, giving users the ability to manage CAT-code assignments within the application.',
  tech: ['RPGLE', 'CL / CLLE', 'SQL', 'IBM i'],
};

export const documentIntro =
  'Application code is only half the job when the output is a document someone receives. I work on the systems that turn insurance application data into formatted, printed documents for insureds.';

export const printPipeline: PipelineStep[] = [
  { label: 'RPGLE program', detail: 'Processes business data and gathers what each document needs.' },
  { label: 'O-specs & printer files', detail: 'RPG O-specifications and printer files define the formatted output.' },
  { label: 'Spooled files', detail: 'Output is generated as spooled files on IBM i.' },
  { label: 'ALP print workflow', detail: "The company's ALP print environment handles downstream print and document processing." },
  { label: 'Printed insured documents', detail: 'Formatted documents delivered to insureds.' },
];

export const docPathSteps: PipelineStep[] = [
  { label: 'Import forms', detail: 'Bring existing forms into DocPath.' },
  { label: 'Edit layouts', detail: 'Adjust form layout and formatting.' },
  { label: 'Add fields', detail: 'Define the data fields each form needs.' },
  { label: 'Integrate with RPGLE', detail: 'RPGLE programs supply the data that populates each form.' },
];

export const documentNotes = [
  'Develop and maintain the ALP print workflow using RPG O-specifications and printer files.',
  'Troubleshoot print output and formatting issues across the application, spooled-file, and print-processing workflow.',
];
