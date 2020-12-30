const family = {
  first_name: 'Joe',
  last_name: 'Clemmons',
  gender: 'male',
  relationship: 'cousin',
  DOB: '10-23-1992',
  SSN: 9999,
  income: 20000,
  employer: 'union',
  race: ['White'],
  ethnicity: 'Caucasian',
  highest_grade_completed: '12th grade',
  enrolled_status: false,
  reason_not_enrolled: 'finished',
  attendance_status: 'inactive',
  school_type: null,
  school_name: null,
  mckinney_school: false,
  flag_level: 0,
  id: 1,
  family_id: 1,
  date_of_enrollment: '2020-10-09T00:00:00.000Z',
  household_type: 'Adults and Children',
  length_of_stay: '6 weeks',
  demographics: {
    first_name: 'Joe',
    last_name: 'Clemmons',
    gender: 'male',
    relationship: 'cousin',
    DOB: '10-23-1992',
    SSN: 9999,
    income: 20000,
    employer: 'union',
    race: ['White'],
    ethnicity: 'Caucasian',
  },
  barriers: {
    alcohol_abuse: true,
    developmental_disabilities: false,
    chronic_health_issues: false,
    drug_abuse: false,
    HIV_AIDs: false,
    mental_illness: false,
    physical_disabilities: true,
    list_indefinite_conditions: null,
    list_issues: null,
  },
  schools: {
    highest_grade_completed: '12th grade',
    enrolled_status: false,
    reason_not_enrolled: 'finished',
    attendance_status: 'inactive',
    school_type: null,
    school_name: null,
    mckinney_school: false,
  },
  case_members: 3,
  predicted_exit_destination: 'permanent exit',
  flag: null,
  percent_complete: 0,
  tableData: {
    id: 0,
  },
};
// in effort to keep this percentage dynamic for future code changes this list should be updated with any values that are added that do not need to be calculated for percentage complete
// for example if we ever add message_id or something like that to the families table we dont need to count that value in total percent complete
const valuesToExclude = [
  'id',
  'familiy_id',
  'predicted_exit_destination',
  'flag',
  'percent_complete',
];

// get all the values from the family object
const values = Object.values(family);

const totalCalculatableValues = values.length - valuesToExclude.length;

const completeValues = [];

// iterate over dictionary
for (let i = 0; i < values.length; i++) {
  // find all null values, and add to array of null values
  if (values[i] != null) {
    // console.log(values[i])
    completeValues.push(values[i]);
  }
}

const totalCompleteValues = completeValues.length;

//function to calculate percentage
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

// get a percent complete
const percentComplete = percentage(
  totalCompleteValues,
  totalCalculatableValues
);

console.log(percentComplete);
