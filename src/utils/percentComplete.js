// example household object
const household = {
  case_number: 22,
  phone_one: {
    name: 'Thomas Shelby',
    number: '202-555-0177',
    safeToLeaveMssg: true,
  },
  phone_two: {
    name: 'Maria Shelby',
    number: '770-555-0114',
    safeToLeaveMssg: false,
  },
  safe_alternate: {
    name: 'Mark Shelby',
    number: '809-323-5959',
  },
  vehicle: {
    make: 'BMW',
    year: 2007,
    color: 'red',
    model: 'K1200LT',
    license_plate: '699-VHT',
  },
  last_permanent_address: '7271 Hickory Rd Sterling VA 20164 ',
  homeless_info: {
    prior_location: 'relatives',
    current_location: 'car',
    num_times_homeless: 2,
    total_len_homeless: 1,
    homeless_start_date: '26-AUG-2019',
    length_at_prior_location: '2 weeks',
    length_at_current_location: '3 days',
  },
  gov_benefits: {
    RRH: false,
    snap: true,
    cps_fps: false,
    foodstamps: true,
    housing_voucher: false,
    veteran_services: true,
  },
  domestic_violence_info: {
    fleeing_dv: false,
    YWCA_contacted: false,
    has_court_order: false,
    date_last_incident: false,
    anonymity_preferred: true,
  },
  pets: 0,
  avatar_url:
    'https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg',
  length_of_stay: '16 weeks',
  case_members: 3,
  members: [
    {
      date_of_enrollment: '2020-10-09T05:00:00.000Z',
      household_type: 'Adults and Children',
      demographics: {
        first_name: 'Thomas',
        last_name: 'Shelby',
        gender: 'male',
        relationship: 'Dad',
        DOB: '1-03-1988',
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
        list_indefinite_conditions: 'NA',
        list_issues: 'NA',
      },
      schools: {
        highest_grade_completed: '12th grade',
        enrolled_status: false,
        reason_not_enrolled: 'finished',
        attendance_status: 'inactive',
        school_type: 'NA',
        school_name: 'NA',
        mckinney_school: false,
      },
      case_members: 3,
    },
    {
      date_of_enrollment: '2020-10-09T05:00:00.000Z',
      household_type: 'Adults and Children',
      demographics: {
        first_name: 'Jacob',
        last_name: 'Shelby',
        gender: 'female',
        relationship: 'Son',
        DOB: '10-23-2015',
        SSN: 9999,
        income: 20000,
        employer: null,
        race: ['White'],
        ethnicity: 'Caucasian',
      },
      barriers: {
        alcohol_abuse: false,
        developmental_disabilities: false,
        chronic_health_issues: false,
        drug_abuse: false,
        HIV_AIDs: false,
        mental_illness: false,
        physical_disabilities: false,
        list_indefinite_conditions: 'NA',
        list_issues: 'NA',
      },
      schools: {
        highest_grade_completed: 'Pre-Kindergarten',
        enrolled_status: true,
        reason_not_enrolled: 'N/A',
        attendance_status: 'active',
        school_type: 'elementary',
        school_name: 'Wright',
        mckinney_school: false,
      },
      case_members: 3,
    },
    {
      date_of_enrollment: '2020-10-09T05:00:00.000Z',
      household_type: 'Adults and Children',
      demographics: {
        first_name: 'Maria',
        last_name: 'Shelby',
        gender: 'female',
        relationship: 'Mom',
        DOB: '12-03-1992',
        SSN: 9999,
        income: 20000,
        employer: null,
        race: ['White'],
        ethnicity: 'Caucasian',
      },
      barriers: {
        alcohol_abuse: false,
        developmental_disabilities: false,
        chronic_health_issues: false,
        drug_abuse: false,
        HIV_AIDs: false,
        mental_illness: false,
        physical_disabilities: false,
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
    },
  ],
};

// array to hold all values
const allValues = [];
// array to hold all incomplete values
const incompleteFields = [];

// counter to hold null count
let nullCount = 0;
// counter to hold complete count
let completeCount = 0;
// get all the values from the any object
function getAllValues(data) {
  // if data is object recurse to get those values
  if (typeof data === 'object') {
    for (const key in data) {
      getAllValues(data[key]);
    }
    // count each null value
    for (const key in data) {
      if (data[key] === null || data[key] === undefined) {
        nullCount += 1;
        // console.log('incomplete value found:', key);
        // if incomplete value is found push to array to return
        incompleteFields.push(key);
      }
    }
  } else {
    if (data) {
      completeCount += 1;
    }
  }
  allValues.push(data);
}
//function to calculate percentage
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}
// function that returns a percent complete
// pass in data
export function returnPercentComplete(data) {
  // get an array of all complete values
  getAllValues(data);
  // get number of complete values
  const total = allValues.length;

  // subtract nullCount from allValues.length and get number of complete values
  const totalComplete = total - nullCount;
  // calculate a percentage
  const percent_complete = percentage(totalComplete, total);
  // return a percentage
  return [Math.round(percent_complete), incompleteFields];
}
