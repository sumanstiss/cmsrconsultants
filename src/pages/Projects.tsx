import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Search, X, Mail, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LIST = [
  'All',
  'Agriculture & Livelihood',
  'Environment & Climate Change',
  'Health and Nutrition',
  'Gender',
  'Education & Skill Development',
  'Child Rights',
  'WASH',
];

// Thematic areas with project details
const THEMATIC_AREAS = [
  {
    category: 'Agriculture & Livelihood',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    projects: [
      {
        title: 'Baseline Study: Mobilizing MGNREGA - A High Impact Collaborative Water Security Programme in Jharkhand',
        description: 'Conducted baseline study to establish initial situation for improving food and nutrition security in drought-prone districts, channeling MGNREGA funds for irrigation infrastructure to enhance cropping intensity, diversity, and productivity. Project by PRADAN, WOTR, SPWD, supported by Welthungerhilfe.',
        fullText: 'The \'Consortium\' of three organisations i.e. PRADAN, WOTR and Society for Promotion of Wastelands Development (SPWD) initiated a project with the objective "To contribute to improved food and nutrition security of vulnerable populations in selected drought prone districts in 6 Blocks of two districts of Jharkhand". The project was supported by Welthungerhilfe (WHH), a German non-denominational and politically independent non-profit and non-governmental agency working in the field of development cooperation and humanitarian assistance. The project proposed to channelize the MGNREGA funds for improving irrigation infrastructure in the villages for enhancing their cropping intensity, diversity and productivity. The project proposed to use agriculture for improving nutrition outcomes, as it addresses some of the direct causes of undernutrition (inadequate food and nutrient intake) and some of the key underlying factors (e.g., poverty, low income, and food insecurity). The \'Baseline Study\' was conducted with the aim to establish the baseline situation pertaining to the impact and outcome matrix proposed for the project.',
      },
      {
        title: 'Value Chain Gap Analysis: Three Agri-Commodities in Kalahandi District, Odisha',
        description: 'Analysis of Seasonal Pulses, Moringa, and Backyard Poultry value chains. Identified critical gaps preventing women farmers from increasing incomes and recommended solutions for effective value chain interventions.',
        fullText: 'The broad expectations of this Value Chain Specific Gap Assessment study was to understand the critical gaps in the identified value chains (Seasonal Pulses, Moringa and Backyard Poultry) and recommend possible solutions to overcome the gaps. More importantly, the study findings intended to support in developing effective value chain development interventions. The study adopted a well-designed methodology to capture the gaps in value chain that prevent women farmers from enhancing their incomes from the identified value chains. In addition to the women farmers, the study team also reached out to multiple value chain actors (Processors, Wholesale Traders, Commission agents and Distributors etc.) and representatives from the government departments (agriculture, horticulture, KVK, etc.) in order to understand the complete value chain of the selected commodities, key gaps and possible recommendations.',
      },
      {
        title: 'Baseline Study: "Shakti" Project in Kalahandi district, Odisha',
        description: 'Climate resilience for marginalized rural women. The project aims to increase resilience to climate changes and capacitate women to take part in decision-making processes related to climate adaptation, food security and nutrition.',
        fullText: 'The project aims to make a significant change in peoples\' lives by "increasing the resilience of marginalized rural women to climate changes, capacitate them to take part in decision-making processes related to climate adaptation, food security and nutrition". The baseline study aimed to establish benchmarks at the start of the project on selected indicators to enable measurement of project\'s impact and outcomes at the end of project intervention. The study also focused on gathering inferences that provide gender sensitive recommendation for the project\'s overall strategy and to inform the review of targets against project indicators as needed, to ensure they are achievable. A cross-sectional study design was followed with assessments to be undertaken at start of the project and end of the project (total duration of project, 3 years). Quantitative data was collected through interview of a total of 460 households (23 households from each village), using a structured questionnaire. To substantiate, and triangulate data collected through quantitative tools, qualitative data was collected through Focused group discussions with female and male farmers; In-depth Interviews with SHG leaders and Panchayati Raj members. Information available through secondary sources viz. government data/reports, publications by organizations of repute etc. were also used to provide context. The indicators were selected such that they are capable of measuring project impacts (project goal or long-term objective) and project outcomes (medium term objectives).',
      },
      {
        title: 'Feasibility Study: Climate resilient farming systems in Purulia, West Bengal',
        description: 'Evaluation of the first phase of project and review of concept for planned new project. Survey conducted among 364 households across 12 villages to analyze relevance, effectiveness, efficiency, and sustainability.',
        fullText: 'The broad nature of the assignment was two-fold i.e., to evaluate the success and impact of the first phase of project, and to review the concept (impact matrix, proposed activities and budget) for the planned new project and give qualified guidance on the development of the planned project. The evaluation was oriented towards the specific objectives, the results and the indicators of the project and analyzed relevance, effectiveness, efficiency, overarching developmental impact, sustainability and cross-cutting issues as well as the replicability of project interventions through the scale-up project. The survey was conducted among 364 households, spread across 12 villages of Joypur and Jhalda blocks (six villages each from current project and new project). The households from the current project was covered through a\'panel\' survey.',
      },
      {
        title: 'Micro Planning: Cluster level planning in Bathinda, Chhota Udepur and Damoh',
        description: 'Preparation of Cluster Level Micro Planning in Bathinda (Punjab), Chhota Udepur (Gujarat) and Damoh (Madhya Pradesh) for CARE. Deepened understanding on agriculture and livestock rearing practices, crop preferences, and natural resource management.',
        fullText: 'The objective of this micro planning exercise was to deepen CARE\'s understanding on the landscape of the impact population, broadly in the areas of agriculture and livestock rearing practices, crop preferences, current package of practices, inputs used, water use for agriculture, soil and water conservation practices along with overall natural resource management practices. In line with the objective of the micro planning, community consultation process was undertaken in each micro cluster. A set of PRA tools in the form of Focus Group Discussions focusing on complete micro cluster profile, social and natural resource mapping, production profile of crops, seasonality calendar, training need analysis, stubble burning, energy and opportunity mapping in farm sector/allied sector/traditional. The exercise also used transect walk and informal discussions and observation throughout the visits to triangulate and confirm the data gathered through PRA tools. A Civil Engineer was also engaged in each location to prepare the detailed plan for NRM structures covering resource mapping, ownership mapping, INRM technologies and structures with dimensions, action plan with proposed land use, map, labour requirements, budgets etc.',
      },
      {
        title: 'Endline Evaluation: Climate Change Adaptation of Women Smallholders and Cotton Producers from Vidarbha Region, Maharashtra',
        description: 'Evaluation of CARE India\'s "Environmentally Sound and Climate Resilient Cotton Production Practices" project in Buldhana district, Maharashtra (2018-2021). Focused on gathering evidence on quantitative and qualitative results and outcomes.',
        fullText: 'CARE India\'s project on "Environmentally Sound and Climate Resilient Cotton Production Practices (ESCRCPP)", supported by Group Galeries Lafayette, was implemented from 2018 to 2021 in Buldhana district of Maharashtra, with an aim to promote environmentally sound, climate-resilient and inclusive cotton production. The location of the project was guided by the fact that Vidarbha accounts for half of the cotton area of Maharashtra, which has one third of cotton growing area in India and Buldhana district being the major cotton producing area in Vidarbha. The evaluation focused on gathering evidences on the quantitative and qualitative results and outcomes of this project to understand key learnings. The focus was on the elements that worked very well and contributed to the sustainability of the projector otherwise. The findings of this assessment were shared among key stakeholders as a part of knowledge sharing.',
      },
      {
        title: 'Impact Tracking & Tracer Study: Maharashtra Agri-skilling Programme (MASP)',
        description: 'Impact tracking study in 12 districts and tracer study in 6 districts of Maharashtra. Program aimed to train and certify 2,82,000 farmers in Group Farming Practice. Total of 3700 farmers interviewed across 12 districts.',
        fullText: 'Palladium Consulting India Pvt. Ltd. is part of a consortium implemented the Maharashtra Agri-skilling Programme (MASP)supported by National Skill Development Corporation – NSDC, Government of India and the Government of Maharashtra. The program aimed to recognise prior learning of farmers, orient them to the concept and allied ideas of Group Farming Practice, impart practical inputs in group farming and facilitate paperwork for formation of Farmer Producer Organisations (FPO). The overall target of the Program was to train and certify 2,82,000 farmers in Group Farming Practice and submit 2000 FPO undertakings. The Program was split into three training phases and implemented in a cascading manner. The training activities were done in 6 to 7 districts to cover all the 34 districts of Maharashtra. The study tried to understand key factors like relevance, effectiveness, sustainability and potential impact of the agri-skilling program as well as the key shortcomings/bottlenecks in the processes and results, and elaborate upon ways and means to overcome them. A total of 3700 farmers from 12 selected districts were interviewed. In addition, FGDs with FPC and Non FPC members, KIIs and IDIs with selected respondents were also done.',
      },
      {
        title: 'End-line Study: Community-based Adaptation Project "Where the Rain Falls"',
        description: 'Project implemented by CARE India in Bagicha and Pathalgaon blocks of Jashpur district, Chhattisgarh since 2014. Aimed to increase climate resilience of 3000 tribal women and their households in 40 villages.',
        fullText: 'The WTRF project was implemented by CARE India with financial support from AXA in Bagicha and Pathalgaon blocks of Jashpur district. The project was implemented since 2014 with the ultimate aim to increase climate resilience of 3000 tribal women and their households in 40 villages of the program district and to curtail shocks and stresses among the tribal women emerging due to climate change. The project interventions advocated ‟promotion of community-based strategies and practices" evolved by CARE India. The endline evaluation was conducted to provide evidence-based information that is comparable (pre and post interventions) and summarize the quantitative and qualitative results and outcomes from WtRF activities. The study focused on identifying key lessons learnt and provide recommendations that contribute to the sustainability of this project and aid in the overall enhancement of the programming of CARE and its partners in India.',
      },
      {
        title: 'Documentation: Climate Change Adaptation and Cotton Production (CCACP) Project',
        description: 'Documentation of project learnings in Buldhana district, Maharashtra. Focused on developing environmentally sound and climate resilient cotton production model plots for demonstration on lands of traditionally cotton growing women smallholders.',
        fullText: 'The project focused on developing environmentally sound and climate resilient cotton production model plots for demonstration on the lands of traditionally cotton growing women smallholders of 10 villages. The package included; modules on good practices for cotton production, as well as inputs like seeds, bio-fertilizers, farm equipment and post-harvest storage materials. This assignment was entrusted to CMSR Consultants with the aim to document the project learnings and disseminate the project experience of promoting climate resilient cotton production so as to inform key stakeholders on various State, National, and International Platforms. At the community level, discussion was conducted with lead farmers/demo plot farmers to understand their acceptance and response in switching over from BT cotton to organic cotton cultivation. Interviews with key stakeholders at block/district level (Agriculture department / Extension department / Trainers/ KVKs, etc.) was also done.',
      },
      {
        title: 'Data Collection: Animal Protein Consumption Study',
        description: 'Study conducted in four states: Rajasthan, Madhya Pradesh, Maharashtra and Assam. Survey among 4704 households and representatives of Abattoirs, Retail Stores, HRI Sector, Dairy Companies, Poultry companies and wholesalers.',
        fullText: 'The study was conducted in four states i.e. Rajasthan, Madhya Pradesh, Maharashtra and Assam. The scope of the study involved conducting a survey among 4704 households spread across the four states. Besides, the study team also administered the survey questionnaire among the representative of selected Abattoirs, Retail Stores (modern and conventional), HRI Sector, Dairy Companies (Co-op &Pvt.;), Poultry companies (Meat & Egg) andwholesalers of Meat, Fish, Poultry (Chicken), Egg and Milk.',
      },
      {
        title: 'Impact Assessment: Godhan Program in 14 districts',
        description: 'Impact Assessment Study in 14 Project Districts of Maharashtra, Bihar and Uttar Pradesh under Godhan Program for BAIF Development Research Foundation. Large scale data collection with 3000 farmers and 1500 DIG members.',
        fullText: 'The study was undertaken for BAIF Development Research Foundation, Pune. The study was conducted to understand the project impact on the target group and also to understand the functioning of various programmes for course correction and lessons learned. It has also improved decision making for the current or next generation socio-economic development projects, including Field Performance Recording (FPR), documentation, M & E, and research. The study involved large scale data collection in field (face to face interviews with 3000 farmers and 1500 DIG members). Besides, 100 focus group discussions were also conducted with farmers and DIG members and telephonic interviews were conducted with 10000 farmers.',
      },
      {
        title: 'Development: FFBS Manual & Toolkit for CARE India Pathways Project',
        description: 'Preparation of Farmer\'s Field and Business School (FFBS) Manual and Toolkit for CARE India\'s Pathways Program. Adapted Pathways India Resource Material into a full-fledged FFBS Manual with participatory tools and methodologies.',
        fullText: 'A toolkit on Farmer\'s Field and Business School (FFBS) has been brought out by the Pathways Global Program of CARE. The toolkit follows Klobe\'s Learning Cycle Approach. Though Pathways India also follows some of the session plans and methodologies as listed in the Global Pathways toolkit, there was scope for the adaptation of the toolkit to incorporate field and community conditions and requirements, and keeping in mind the resource material and content CARE actually intends to deliver in the respective domains, in a crop cycle sensitive manner. Therefore, in order to adapt Pathways India\' Resource Material into a full-fledged FFBS Manual with participatory tools and methodologies interwoven, CARE India sought the services of CMSR Consultants for "Preparation of FFBS Manual and Tool kit for CARE India\'s Pathways Program"',
      },
      {
        title: 'Community Mobilisation: Household and Livelihood survey for Slum Redevelopment Program',
        description: 'Community Mobilisation, Household and Livelihood survey for Slum Redevelopment Program under RAY in Buxar and Ara districts of Bihar. Large scale data collection (25000 households) in slum households.',
        fullText: 'The purpose of the project was to support WAPCOS Limited in preparation of SFCPoA and DPR for development of slums under Rajiv Awas Yojana scheme as per GoI guidelines. The project component includes community mobilization and conducting slum household & livelihood survey in Buxar and Ara districts of Bihar. The study involved the large scale data collection (25000 households) in slum households through the formats prepared by the Ministry of Housing and Urban Poverty Alleviation with the help of National Buildings Organization (NBO).',
      },
      {
        title: 'Thematic Study: Community Based Adaptation (CBA) Project in Chhattisgarh',
        description: 'Qualitative study and documentation in Jashpur district focusing on five thematic areas: Agriculture Collectivization, Soil & Water Conservation; Climate Resilient & Financial Services; Inclusive Governance and Gender.',
        fullText: 'Qualitative study and documentation pertaining to various interventions done under "Community Based Adaptation Project" was undertaken in Jashpur district. The project interventions advocated‟ promotion of community-based strategies and practices evolved by CARE India. The study focused on how these interventions had worked on the community around the underlined five Thematic Areas i.e. Agriculture Collectivization, Soil & Water Conversation; Climate Resilient & Financial Services; Inclusive Governance and Gender. In-depth interviews (IDIs) were conducted with the project functionaries and Focus Group Discussions with the Adivasi men and women of the farming community, Members of Village Development Committee, Block level Motivation Teams, Self-help Groups, Water User Associations and Joint Forest Management Committee.',
      },
      {
        title: 'Consumer Survey: Improved Pigeon Pea Varieties for Bern University, Switzerland',
        description: 'Value chain analysis and consumer survey in Delhi & Hyderabad for Indo-Swiss Collaboration in Biotechnology (ISCB) to ascertain market perception and preference of desired traits in improved pigeon pea cultivators.',
        fullText: 'Indo-Swiss Collaboration in Biotechnology (ISCB) is a bilateral research and product development program, jointly funded and steered by the Indian and Swiss government. In phase IV (2013-17) research networks were funded to work on pest resistance, yield improvement and climate resistance of cassava, finger millet and pigeon pea.CMSR Consultants carried out the value chain analysis and consumer survey in Delhi & Hyderabad to ascertain market perception and preference of desired traits in improved pigeon pea cultivators. The exercise explicitly gave an insight about the tangible benefits that were gradually emerging from the project which are capable enough to challenge any vulnerable situation that can occur during climate change in terms of hunger and human mobility.',
      },
      {
        title: 'Baseline & End-line Study: Pathways Program in Kalahandi and Kandhamal Districts, Odisha',
        description: 'Baseline survey at the beginning of Supplemental Grant Period and end-line assessment to establish quantitative and qualitative values. Measured progress made during the supplemental grant period and documented lessons learnt.',
        fullText: 'Pathways project was implemented during 2012 – 2015 and the Gates Foundation extended the Pathways program for one more year from April, 2016 to March, 2017 under the Supplemental Grant Period (SGP). CARE India contemplated to utilise this Grant for consolidating project outcomes and learning for sustainability, scale up and replicating best practices in other project locations through a wide range of stakeholders. CMSR Consultants undertook this Baseline survey at the beginning of this extended period in order to ascertain the project impact at a later stage towards completion of the project and their sustainability. End-line assessment was conducted to establish quantitative and qualitative end line values against the baseline values and measure the progress made during the supplemental grant period. The study also identified learning and challenges that hinder the success of the project and also documented the lessons learnt that could be used while developing future strategies. The quantitative assessment included measuring the status of the women Self-help Groups, and the Community Resource Persons on the Sustainability parameters as suggested by CARE India.',
      },
      {
        title: 'Impact Assessment: Reliance Nutrition Gardens under RJMCHNM program in Maharashtra',
        description: 'Impact Assessment of Reliance Nutrition Gardens established in almost 12000 Anganwadi Centres across 16 districts of Maharashtra. Evaluated role of RNGs in improving nutritional diversity in midday meals.',
        fullText: 'Reliance Foundation had provided technical support to Rajmata Jijau Mother & Child Health Nutrition Mission (RJMCHNM) to establish Reliance Nutrition Gardens in almost 12000 Anganwadi Centres across 16 districts of Maharashtra. The purpose of establishing Nutrition Gardens in AWCs was to ensure fresh supply of vegetables and fruits to children, the ultimate objective being to improve access to more nutritious diet and the nutritional outcomes of the children through their mid-day meals. After 4 years of implementation, CMSR Consultants undertook the \'Impact Assessment Study\' to evaluate the role of these RNGs in improving the nutritional diversity in the midday meal served to the children. In addition, the study also assessed the growth monitoring and tried to compare child monitoring data from treated Anganwadi and control Anganwadi over the project period for the location. The study used mixed method; involving structured interview of anganwadi workers using CAPI techniques and through the qualitative methods (In-depth Interviews with supervisors, Focus group discussions with mothers of children below 6 years and Key Informant Interviews with DPO/CDPO and PHC/CHC).',
      },
      {
        title: 'Community Nutrition Gardens: Process Documentation and Conceptualisation of CNGs Model',
        description: 'Process Documentation and Conceptualisation of Community Nutrition Gardens (CNGs) Model for ERADA in Madhya Pradesh. Documented learnings and success of the model, exploring integration of solar energy, aquaculture, and value-chain based models.',
        fullText: 'Under the Indo-German project, community-based horticulture plantations were piloted and demonstrated in 32 gram panchayats of Chhattisgarh under MGNREGA during 2017-19. The integrated model involved an MoU between Gram Panchayats and women Self-Help groups for maintenance of the plantation for 10 years, thus also giving the SHGs access to use the land for intercropping vegetables. This supported short term wage generation through MGNREGA and a longer-term livelihood creation through sale of vegetables in local markets. From 2019, the model was contextualized for implementation in five districts in Madhya Pradesh under another Indo-German Project, wherein women Self-Help Groups (SHG\'s) are entrusted with the task of establishing the Community Nutrition Gardens (CNGs). The objective of these CNG\'s is to enhance dietary diversity at the community and household level by providing economic independence to the women. The ERADA project focussed on documenting the learnings and success of this model so far, and look at conceptualising this as a further integrated model, exploring more areas such as the scope for integrating solar energy for water management, integrating aquaculture into the gardens, scope for value-chain based models and market linkages etc.',
      },
    ],
  },
  {
    category: 'Environment & Climate Change',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    projects: [
      {
        title: 'Baseline Study: Knowledge, Attitude & Behaviour on Delhi Women Construction Workers + Air Pollution',
        description: 'Study by Mahila Housing Trust and Purpose India to mobilize and power up women construction workers to understand the impact of air pollution on their and their children\'s health. Conducted in Bakkarwala, Gokulpuri, and Sawda Ghevra in Delhi.',
        fullText: 'Recognizing the fact that women construction workers are highly vulnerable to air pollution and climate change, Mahila Housing Trust, in association with Purpose India, planned to launch a campaign to mobilize and power up women construction workers to understand the impact of air pollution on their and their children\'s health. The study made an attempt to bring the women construction workers, to the heart of decision- making on-air pollution to ensure there are equitable, sustainable, and long-term solutions. The overall goal of the study was to develop a strategic plan to build, increase and strengthen construction workers\' voices on the issue of air pollution in Delhi. The study also tried to understand the cooking practices followed by the women construction workers and how the adoption of traditional cooking methods like use of brick chulhas are affecting their health. The study was conducted in the three selected locations i.e. Bakkarwala, Gokulpuri, and SawdaGhevra in Delhi. A cross-sectional design was planned for the study - baseline conducted before the project take-off and endline survey will be conducted at the end of the project to measure the behavioural and social changes induced by the project.',
      },
      {
        title: 'Scoping Study: Campaigns on Renewable (Solar) Energy in Farm and Health Care Centres',
        description: 'Scoping study in 6 Districts of Bihar for Purpose India and CEED to raise public awareness and articulate demand for distributed renewable energy (DRE) in elections. Focused on farmers and healthcare workers.',
        fullText: 'Purpose India and Centre for Environment and Energy Development (CEED) planned to initiate a campaign in Bihar, with the purpose of raising public awareness and articulate their demand for distributed renewable energy (DRE) in the election.Also to create pressure on govt and political parties to take action and give commitment to amplify solar adoption to provide reliable electricity to both the agricultural sector and the rural healthcare system. To support the campaign, the study was conducted among farmers and health care workers in five selected districts of Bihar to understand the real, every-day problems that farmers, healthcare workers and migrant workers across Bihar face. The study focused on understanding the issues and challenges faced by farmers and health care workers, identify key narratives, their knowledge and awareness of climate change and possible solutions, frequently used communication channels, identify ways of message packaging & messengers/influencers to reach the audiences of Bihar to ultimately bringing new voices, strengthening the audience and support base for climate solutions and demand and action in Bihar.',
      },
      {
        title: 'Livelihood Cyclists Survey: "Cycle Chalegi, Dilli Badhegi!" initiative',
        description: 'Survey among "Livelihood Cyclists" in Delhi by ASAR, CEED and Purpose India. Purpose was to understand challenges faced by cyclists while cycling in intense traffic and general behavioural pattern of people towards them.',
        fullText: 'CMSR Consultants also rendered its services in terms of data analysis and report writing for a project titled \'Livelihood Cyclists Survey\' conducted byASAR, Center for Environment and Energy Development (CEED) and Purpose India. The survey was conducted among the \'Livelihood Cyclists\' in Delhi under their initiative titled \'Cycle Chalegi, Dilli Badhegi!\'. The purpose of the survey was to understand the challenges faced by the cyclists\' while cycling in intense traffic and the general behavioural pattern of people towards them. The survey also tried to address the concerns of the cyclists and attempted to find out the possible solutions for their problems. The ultimate outcome of this exercise was to generate evidence around the problems faced by daily cycle commuters and to build data on livelihood cyclists in Delhi with the long-term objective of advocating to the Delhi Government for better cycling infrastructure for those who use cycling as the main mode of transportation for work.',
      },
      {
        title: 'Perception Survey: Air Quality in 17 Cities of 12 States',
        description: 'Study to get insights from people about air pollution and understand their extent of knowledge regarding its implications. Covered 5000 respondents through both online and offline survey from 17 cities across 12 states.',
        fullText: 'The purpose of the study was to get insights from people about air pollution and to understand their extent of knowledge regarding its implications. The study covered 5000 respondents through both online and offline survey from 17 cities. The sample cities were classified into two major categories i.e. most polluted cities (Delhi & NCR, Patna, Lucknow, Varanasi, Amritsar, Singrauli, Dhanbad, Raipur, Korba, Chandrapur, Angul and Nagpur) andcities which are fast becoming polluted (Bangalore, Pune, Mumbai, Chennai & Calcutta).The on-line survey link was also shared by the Support Agencies among their people in order to draw a comparison between the neutral audiences and those who are already working on air pollution or environmental issues in terms of their knowledge, awareness and attitude towards air pollution.',
      },
      {
        title: 'Rapid Assessment: Exploring Opportunities to Promote Electricity-Consuming Enterprises',
        description: 'Study for CARE India to identify opportunities for expanding economic activities in underserved rural areas through electricity-consuming enterprises model in Bihar and Uttar Pradesh. Would enhance income and quality of life of people.',
        fullText: 'CMSR Consultants undertook this study for CARE India. The study contemplated on identifying opportunities for expanding economic activities in underserved rural areas through electricity-consuming enterprises model that would enhance the income and quality of life of people. Based on the discussions with the community in the selected study villages the team identified few enterprises involving use of electricity and documented it for the benefit of the decision makers. The study also tried to bring out the constraints in persuading the community for taking up such activities involving use of electricity.',
      },
      {
        title: 'Baseline Study: Improved Cook Stoves (ICS) Project in Bengaluru, Karnataka',
        description: 'Baseline study with gender centric lens to establish benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. Based on interviews of 360 households using CAPI technique.',
        fullText: 'This baseline study aimed toestablish current status of the target population with respect to key indicators of project induced change. The study was done with a gender centric lens which revolves around establishing the benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. The study was based on interviews, through a structured CAPI based questionnaire, of 360 households - 50% from control areas and 50% from intervention areas, with the purpose of measuring the changes in the intervention area at project completion through a repeat survey at end term stage. The sample was drawn using Population Proportionate to Size (PPS) sampling method, using the house hold list provided by CARE India.',
      },
    ],
  },
  {
    category: 'Health and Nutrition',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
    projects: [
      {
        title: 'Process Documentation: Community Nutrition Gardens (CNGs) Model for ERADA',
        description: 'Process Documentation and Conceptualisation of Community Nutrition Gardens (CNGs) Model for ERADA in Madhya Pradesh. Documented learnings and success of the model, exploring integration of solar energy, aquaculture, and value-chain based models.',
        fullText: 'Under the Indo-German project, community-based horticulture plantations were piloted and demonstrated in 32 gram panchayats of Chhattisgarh under MGNREGA during 2017-19. The integrated model involved an MoU between Gram Panchayats and women Self-Help groups for maintenance of the plantation for 10 years, thus also giving the SHGs access to use the land for intercropping vegetables. This supported short term wage generation through MGNREGA and a longer-term livelihood creation through sale of vegetables in local markets. From 2019, the model was contextualized for implementation in five districts in Madhya Pradesh under another Indo-German Project, wherein women Self-Help Groups (SHG\'s) are entrusted with the task of establishing the Community Nutrition Gardens (CNGs). The objective of these CNG\'s is to enhance dietary diversity at the community and household level by providing economic independence to the women. The ERADA project focussed on documenting the learnings and success of this model so far, and look at conceptualising this as a further integrated model, exploring more areas such as the scope for integrating solar energy for water management, integrating aquaculture into the gardens, scope for value-chain based models and market linkages etc.',
      },
      {
        title: 'Endline Evaluation: Kanya Sampurna Project (KSP) in Cuddalore District, Tamil Nadu',
        description: 'Multi-sectoral intervention focusing on advancing health, education, and economic opportunities for girls/women (0-35 years). Project reached 89,242 individuals through different interventions over five years (2017-2022).',
        fullText: 'KSP was a multi-sectoral intervention that focused on advancing health, education, and economic opportunities for girls/women in the age group of 0-35 years. It also focuses on enhancing leadership and life skills in children and adolescents (especially girls) in schools and communities. The project implementation period was for five years (2017-2022) and reached 89,242 individuals through different interventions. The Endline study was conducted to measure and report the outcome and impact of the key components of the intervention and analyse progress made against key areas of change at impact and outcome level of project logical framework. The results of the assessment contributed to the next phase planning of KSP. The study design followed a mixed approach of quantitative and qualitative data collection. Structured survey was conducted among Anganwadi workers, mothers of children (0-6 months&6-23 months), young women (18-35 Years) and primary school teachers. In addition, Girls Leadership Index (GLI) tool was administered among Adolescent girls (11-18 years) and EGRA tool and SRI tool among \'Children in the age group of 6-11 years\' and \'Children in the age group of 5.5 to 6 years\' respectively. FGDs and IDIs were conducted as part of the qualitative survey.',
      },
      {
        title: 'Assessment: Pradhan Mantri Arogya Mitra (PMAM) under PMJAY Scheme',
        description: 'Large scale assignment in association with Deloitte to assess roles and performance of PMAM for operational and programmatic efficiency. Study done in 192 hospitals across 16 districts of 9 states. 5680 exit interviews conducted.',
        fullText: 'This was large scale assignment done in association with Deloitte with the purpose of assessingthe roles and performance of the scheme Pradhan Mantri Arogya Mitra (PMAM) for operational and programmatic efficiency. The study was done in 192 hospitals spread across 16 districts of nine states (Assam, Chhattisgarh, Jammu & Kashmir, Madhya Pradesh, Punjab, Rajasthan, Maharashtra, Tamil Nadu and Uttar Pradesh). A total of 5680 exit interviews were conducted with AB-PMJAY beneficiaries. In addition, 240 Hospital Observations for PMAM activities, 40 KIIs, Case studies and SWOT analysis were undertaken by the study team.',
      },
      {
        title: 'Impact Assessment: Reliance Nutrition Gardens (RNGs) under RJMCHNM program',
        description: 'Impact Assessment of Reliance Nutrition Gardens established in almost 12000 Anganwadi Centres across 16 districts of Maharashtra. Evaluated role of RNGs in improving nutritional diversity in midday meals served to children.',
      },
      {
        title: 'Sitapur Eye Hospital Survey in UP and Uttarakhand',
        description: 'Survey conducted with patient and non-patient respondents in three locations of Uttar Pradesh and two locations of Uttarakhand for Deloitte. Purpose was to find out awareness about eye care needs and health seeking behaviour.',
        fullText: 'The survey was conducted with patient and non-patient respondents under \'Sitapur Eye Hospital Study\' in three locations of Uttar Pradesh namely Sitapur (BH), Laharpur (VC) and Naimish (VC) and two locations of Uttarakhand. The basic purpose of conducting the survey among the patients were to find out their level of awareness about eye care needs; their health seeking behaviour around eye care - what factors determine identification of an appropriate service provider (knowledge and beliefs; accessibility; affordability; quality of care etc); awareness and understanding of SEH services and brand perception and perceived feedback on quality of care received at SEH. The survey among the non-patient respondents primarily focussed on knowing how far the respondents were aware about SEH and its services and what would be their preference in case of routine illness episodes.',
      },
      {
        title: 'Study: Prevention and Control of Anemia among Adolescent Girls',
        description: 'Study in Sitamarhi and Vaishali Districts of Bihar to understand barriers, social norm and behaviour related to nutrition and health among adolescent girls. Assessed understanding of anemia, its salience and consequences.',
        fullText: 'The purpose of the study was to understand the barriers, social norm and behaviour related to nutrition and health among adolescent girls and also to assess their understanding of anemia, its salience and consequences with the objective to generate concrete and actionable ideas that would guide development of intervention program/strategy and implementation plan. The tasks performed by CMSR Consultants included IDI with adolescent girls and their parents, FGDs with adolescent girls, KIIs with front line workers at village level and several officials at the block, district and state level. In addition, there was Observation at household and school level on cooking and consumption practices and norms, hygiene, WASH facilities and behaviours that impact health of adolescent girls as well as Rapid Rural Appraisals (RRA) that included transect walk, daily activity schedule of households and seasonal calendar.',
      },
      {
        title: 'Pre-testing: Pictorial health warning for Tobacco products',
        description: 'Study for Centre for Communication and Change-India to pre-test pictorial health warnings for cigarettes, bidis and smokeless tobacco to test their effectiveness in conveying the message about health hazards.',
        fullText: 'CMSR Consultants took up this study for Centre for Communication and Change-India to pre-test the pictorial health warnings for tobacco products to test their effectiveness" in conveying the message. The main task involved assessment of two sets of pictorial graphics each containing six types of packages with differences in the text and the picture which conveyed warning about the health hazards due to consumption of tobacco. The study was conducted through one-to-one interviews as well as focus group discussions among the smokers and non-smokers of cigarette and bidi and users and non-users of smokeless tobacco products in the broad age-group of 18-55 years, both in rural and urban areas and among males and females. A study protocol/format was developed in consultation with JHHU and WHO to seek responses of the participants of group.',
      },
    ],
  },
  {
    category: 'Gender',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    projects: [
      {
        title: 'Gender Diversity Survey for JCB',
        description: 'Diagnostic study on Gender Diversity for JCB at three locations – Ballabhgarh, Jaipur and Pune (Haryana, Maharashtra, Rajasthan). Purpose was to get insight of JCB staff and shop floor employees on gender diversity journey.',
        fullText: 'At the instance of Marching Sheep, CMSR Consultants undertook the diagnostic study on Gender Diversity for JCB at three locations – Ballabhgarh, Jaipur and Pune. The purpose of the study was to get an insight of JCB staff as well as shop floor employees on how they perceive the journey of their organization and what steps they would like to see in order to make JCB a much better diverse and gender friendly organization. Both quantitative (online & offline) as well as qualitative methods were used for the study. Apart from this, FGDs were conducted with the women employees and In-depth Interviews with the senior officials of JCB.',
      },
      {
        title: 'Gender Analysis: Red Chilli Value Chains',
        description: 'Study on "Gender Analysis in Red Chilli Value Chains" in Kerala, Tamil Nadu and Telangana. Aimed to find out current state of gender and livelihood in supply chain and determine roadmap for further actions.',
        fullText: 'The study aimed to find out the current state of gender and livelihood in the supply chain of Red Chilli and determine the roadmap for further actions. The study also tried to identify the barriers to gender equality women face at individual, relationship and environmental levels including the cultural norms that factor into decision making and power structures. The study followed a mixed approach to gather information. Women farmers and their spouses engaged in red chilli value chains were interviewed using CAPI method. Besides, focus group discussions were also conducted with farmers and factory workers. The discussions followed the participatory approach to explore the key areas of enquiry across the value chains i.e. farmer\'s activity profile along with the seasonal calendar of red chilli VC, household chores, challenges faced by them in maintaining a secure livelihood, etc. Key Informants Interviews (KIIs) with suppliers and other market actors in RCVC were also conducted.',
      },
      {
        title: 'Study: Gender Equality in Barley Value Chains for CARE Consulting',
        description: 'Analysis and Recommendations to Improve Gender Equality in Barley Value Chains for CARE Consulting (USA Team). Focused on mapping roles of women, identifying barriers, and recommending solutions for AB InBev\'s agriculture programming.',
        fullText: 'Care Consulting had supported Ab InBev in 2018 to establish a model from which the company could further evolve its approach to gender for its better world agenda for Phase 1. The organization then planned for Phase 2 for adopting and adapting the gender transformation tools created in Phase 1 to integrate gender in Agriculture. The study focused on; mapping out roles of women in the Barley value chains; identify the barriers to gender equality women face at an individual, relationship and environmental level; recommend solutions to best capitalize on opportunities and address the challenges identified and design KPIs to measure social and commercial success and finally outline a plan for integrating recommended solutions into existing programs or create new programs. In a nutshell, the study attempted to provide an insight in making decisions on how to integrate gender into AB InBev\'s agriculture programming with regard to skills building, connectivity, and financial empowerment.',
      },
      {
        title: 'Baseline Study: Women Empowerment and Resilience in Red Chilli Supply Chain',
        description: 'Baseline study in Telangana to establish current status of women\'s empowerment and degree of resilience in supply chains with regards to their livelihoods. Assessed baseline values for key indicators related to women\'s empowerment.',
        fullText: 'A baseline study in Telangana, which represents the strategy for impacting changes at the level of women\'s empowerment within red chilli supply chains. The baseline study contributed to establish current status of women\'s empowerment and degree of resilience in supply chains with regards to their livelihoods. The specific objective of this study was to assess and establish baseline values for key indicators related women\'s empowerment and their resilience in red chilli supply chain in the state of Telangana. The study also provided a clear baseline benchmark on role of women in red chilli supply chain and the challenges they face in their lives and livelihoods.',
      },
      {
        title: 'Baseline Study: Gender Roles in Rice Value Chain',
        description: 'Baseline Study of Gender Roles in Basmati Rice Value Chain in Selected Districts of Haryana for Mars Food. Obtained data pertaining to identifying opportunities and constraints of men and women in Basmati Rice Value Chain.',
        fullText: 'At the instance of Mars Food, CARE India undertook the Base-line Study to identify gender roles in the basmati rice value chain. It partnered with CMSR Consultants for undertaking the qualitative aspect of the proposed study. The main objective of this study was to obtain data from the field pertaining to identifying opportunities and constraints of men and women as well as farm workers which includes migrant and non-migrant households in Basmati Rice Value Chain in selected three districts of Haryana.',
      },
      {
        title: 'Baseline Study: Improved Cook Stoves (ICS) Project - Gender Centric',
        description: 'Baseline study with gender centric lens in Bengaluru, Karnataka to establish benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. 360 households interviewed.',
        fullText: 'This baseline study aimed toestablish current status of the target population with respect to key indicators of project induced change. The study was done with a gender centric lens which revolves around establishing the benchmarks on poor urban women\'s awareness, access and adoption status with respect to Improved Cook Stoves. The study was based on interviews, through a structured CAPI based questionnaire, of 360 households - 50% from control areas and 50% from intervention areas, with the purpose of measuring the changes in the intervention area at project completion through a repeat survey at end term stage. The sample was drawn using Population Proportionate to Size (PPS) sampling method, using the house hold list provided by CARE India.',
      },
    ],
  },
  {
    category: 'Education & Skill Development',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    projects: [
      {
        title: 'Endline Evaluation: Kanya Sampurna Project (KSP)',
        description: 'Multi-sectoral intervention focusing on advancing health, education, and economic opportunities for girls/women (0-35 years) in Cuddalore District, Tamil Nadu. Project reached 89,242 individuals through different interventions over five years.',
        fullText: 'KSP was a multi-sectoral intervention that focused on advancing health, education, and economic opportunities for girls/women in the age group of 0-35 years. It also focused on enhancing leadership and life skills in children and adolescents (especially girls) in schools and communities. The project implementation period was for five years (2017-2022) and has reached 89,242 individuals through different interventions. The Endline study was conducted to measure and report the outcome and impact of the key components of the intervention and analyse progress made against key areas of change at impact and outcome level of the project logical framework. The results of the assessment would help contribute to the next phase planning of KSP. The study design followed a mixed approach of quantitative and qualitative data collection. Structured survey was conducted among Anganwadi workers, mothers of children (0-6 months &6-23 months), young women (18-35 Years) and primary school teachers. In addition, Girls Leadership Index (GLI) tool was administered among Adolescent girls (11-18 years) and EGRA tool and SRI tool among \'Children in the age group of 6-11 years\' and \'Children in the age group of 5.5 to 6 years\' respectively. FGDs and IDIs were conducted as part of the qualitative survey.',
      },
      {
        title: 'Baseline Study: "Neev" Project in 100 AWCs of Udham Singh Nagar District',
        description: 'Baseline study for United Way Delhi\'s Neev program in 100 anganwadi centers from three blocks of Udham Singh Nagar district, Uttarakhand. Aimed to improve development of children in 0-6 years age group.',
        fullText: 'United Way Delhi\'s Neev program aligns with the worldwide campaign Born Learning. The program aimed to improve the development of children in the 0-6 years age group by providing them child-friendly infrastructure, improving school readiness, and enhancing the role of caregivers in children\'s development.The project aimed to cover 100 anganwadicenters from three blocks of Udham Singh Nagar district in three years. The objective of the baseline survey was to assess the situation in terms of infrastructure facilities, parents\' awareness and care giver engagements in AWC, children, communities\' awareness to ECD, and community profiling using PRA exercise. The purpose of the exercise is to provide an information base against which to monitor and assess an activity\'s progress and effectiveness during implementation and after the activity is completed. The study adopted a mix of quantitative and qualitative methodology. The major stakeholders of the study included; project team, community members, government departments (Health department and Women & Child Development Department – AWW, AWH, CDPO and Supervisor), Panchayat members, mothers and children. CAPI technique was adopted to capture the quantitative data.',
      },
      {
        title: 'End-line Study: School Support Program (SSP) in Gurugram, Haryana',
        description: 'Program to provide inclusive and quality education for all children. Established community-based Youth Resource Center providing youth with essential life skills, information about career opportunities and skill development avenues.',
        fullText: 'The SSP program was started with the goal to provide inclusive and quality education for all children. The broad objective of the program was to help government schools and schools run by non-profit agencies for marginalized children in Delhi and NCR. The program established a community-based Youth Resource Center which provided the youth with essential life skills like communication, information about better career opportunities as well as avenues for skill development. The objective of the assessment was to measure the changes that occurred among the students/youth in terms of improvement in their academic performance, change in their conduct and behavior, change in awareness level towards health and hygiene practices and also the changes in the school infrastructure.',
      },
      {
        title: 'Baseline Study: "Born Learning" Program in Rudrapur, Uttarakhand',
        description: 'Baseline study for United Way Delhi\'s "Born Learning" program aimed at overall well-being and development of new born in formative years (0-6 years) in selected 20 Anganwadi centers of Rudrapur, Uttarakhand.',
        fullText: 'The \'Born Learning\' is a United Way Worldwide program, aimed at the overall well-being and development of the new born in its most formative years (0-6 years) of growth and development and to improve the infrastructural facilities including WASH in selected 20 Anganwadi centers of Rudrapur, Uttarakhand. CMSR Consultants conducted thebaseline study for United Way Delhi to know the existing conditions of the AWCs so as to set up a benchmark and their actual need for improvement. The study adopted a mix of quantitative and qualitative approach. Interviews were conducted with Anganwadi Workers/Helpers and Mothers of children (0-3 years) and children (3-6 years). A Focus Group Discussion checklist was prepared to conduct the discussions with community members.',
      },
      {
        title: 'Market Assessment: Magic Bus\' Youth Livelihood Programme',
        description: 'Market assessment for Magic Bus India Foundation directed towards establishing relationship of likely youth needs and market factors in Patna, Lucknow, Gurgaon, Manesar and Baddi. Influenced placement and sustainability of Livelihood program.',
        fullText: 'CMSR Consultants conducted this assessment for Magic Bus India Foundation, New Delhi. The market assessment was directed towards establishing the relationship of the likely youth needs in the project area and the market and community factors that will influence the placement and sustainability of Livelihood program proposed to be implemented by Magic Bus. The Assessment was done in three catchment areas of five selected locations viz; Patna, Lucknow, Gurgaon, Manesar and Baddi. The major tasks performed by CMSR include; developing research design, drafting research tools (SIS, FGD guidelines for parents and youth, IDI formats for employers as well as training institutes), data analysis and report writing.',
      },
      {
        title: 'Impact Evaluation: J.P.Morgan - Don Bosco Academy for Skills',
        description: 'Impact Evaluation of "J.P Morgan – Don Bosco Tech Academy for Skills" program in 8 states: Andhra Pradesh, Delhi, Jharkhand, Karnataka, Kerala, Odisha, Uttar Pradesh and West Bengal. Interviewed 639 trained candidates.',
        fullText: 'CMSR Consultants Pvt. Ltd., at the instance of Don Bosco Tech Society conducted the Impact Evaluation of \'J.P Morgan – Don Bosco Tech Academy for Skills\' programin the states of Andhra Pradesh, Delhi, Jharkhand, Karnataka, Kerala, Odisha, Uttar Pradesh and West Bengal. The study involved interviewing a total of 639 trained candidates besides, conducting discussions with the faculty members of the selected centers to understand the implementation process followed by them and to know the challenges/barriers faced by the staff in implementing the program. In addition, 10 employers from selected locations were interviewed to find out the extent to which they were satisfied with the performance of DB Tech candidates. Feedback was also sought from the parents/families of the selected trainees through Focus Group Discussions.',
      },
      {
        title: 'Evaluation: Magic Bus\' Livelihood Program in Delhi',
        description: 'Evaluation of Magic Bus\' Livelihood Program initiated with Comic Relief with envisaged Goal of "Sports for Change". Program aimed at providing disadvantaged youth with vocational training and support to achieve personal and professional goals.',
        fullText: 'The Livelihood Program of Magic Bus was initiated along with Comic Relief with the envisaged Goal of "Sports for Change". The program aimed at providing disadvantaged youth in Delhi with the right vocational training and support to enable them to identify and achieve their personal and professional goals and successfully move into sustained employment or further education, or job-based training. CMSR Consultants was entrusted with the task of undertaking an "Evaluation" exercise to understand to what extent "Activity Based Learning" has impacted the target group in grooming them to choose a successful career. The evaluation involved analysis of both quantitative and qualitative data. In-depth interviews were conducted with the youth, Implementing functionaries and certain Employers and Training Institutes.',
      },
      {
        title: 'Study: Perception of ICDS in Selected Districts',
        description: 'Study conducted in two districts each of Rajasthan and Andhra Pradesh (total 4 districts). Objectives were to assess current conditions of existing Anganwadi centers and type of services provided to beneficiaries.',
        fullText: 'The study was conducted in two districts each of Rajasthan and Andhra Pradesh (total 4 districts). The objectives of the study were to assess the current conditions of the existing Anganwadi centers and to know the type of services provided by them to the beneficiaries. Assessment was made about the available infrastructures in AWCs, status of WASH facility, availability of learning materials, etc. Besides, challenges/barriers faced by Anganwadi workers in running the centers were also captured through the survey. Apart from the AWWs, interviews were also conducted with ASHA, ANM and Key Influencers at village level. Community perception about the AWCs were also sought from the people through focus group discussion. DPO/CDPO were also interviewed at the district/block level. The ultimate goal of doing this exercise was to develop and create model AWCs in the selected areas based on the survey results. The program also contemplated to find out the scope of establishing kitchen gardens in the targeted anganwadicenters.',
      },
      {
        title: 'Baseline Study: Youth Resource Center in Ghaziabad',
        description: 'Project intended to improve learning outcomes of children in school, sensitizing students towards conservation of environment and life skills. Community engagement and awareness generation activities with parents were also planned.',
        fullText: 'The project intended to improve learning outcomes of the children in school, sensitizing students towards conservation of environment and life skills. In addition, community engagement and awareness generation activities with parents were also planned to be conducted to strengthen and facilitate a school-friendly School Management Committee (SMC). Empowerment of youth with the agenda of community ownership towards its social goods, rights and responsibilities through YRC was also one among the intervention\' agenda. A mixed method study design was followed to accomplish the assignment.',
      },
      {
        title: 'KAP Study: Digital Learning Centre Project in Delhi',
        description: 'Plan India launched Digital Learning Centre Project in West and South West Delhi to address learning crisis faced by girls after completing Class VIII. Aimed to curb school dropout, promote retention, and improve learning outcomes.',
        fullText: 'Plan India launched the Digital Learning Centre Project in West and South West Delhi to address the learning crisis faced by girls after they complete Class VIII. The idea behind the initiative was to curb school dropout, promote retention, improve learning outcomes and boost the self-confidence of girls in marginalized communities, to map the change in knowledge and attitude amongst the girls related to education and employment, to gauge the attitude of parents and community towards girls\' education through comparison of controlled and non-controlled groups based on recall method, understand the change amongst the girls particularly improvement in their life skills because of the project interventions.',
      },
      {
        title: 'Process Documentation: Child Centred Community Development Program',
        description: 'Process Documentation – Innovation & Best Practices of Child Centred Community Development Program in Bihar. Plan India with support of five partner NGOs engaged in implementation in five districts of Bihar.',
        fullText: '"Plan India" with the support of five partner NGOs were engaged in the implementation of "Child Centred Community Development (CCCD) programmes" in five districts of Bihar. The program was directed towards improving the status of children in the community by providing them access to their rights, strengthening and improving the existing Government schools to provide a better learning environment. Capacity building of Teaching faculty, Bal Sansad Members (Children\'s Parliament) and School Management Committee members were undertaken in around 200 selected schools for bringing about a better learning environment. The issues covered under the program included; how to introduce novel concepts like "Mini library", ensuring separate sanitation facilities for boys and girls, improving interior ambience of (decoration) of classrooms, promoting children\'s participation in exhibitions held by schools, observance of important days with various social and cultural activities etc. The "Process Documentation" exercisefocussed on documenting the innovation and best practices of the Education Domain. Primary research included In-depth Interviews (IDIs), Key Informants Interviews (KIIs) and Focus Group Discussions with the stakeholders. Secondary research included the review of the project documents compiled under the project to understand the extent of the interventions in accomplishing the envisaged goals / objectives.',
      },
    ],
  },
  {
    category: 'Child Rights',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
    projects: [
      {
        title: 'Media Collective for Child Rights (MCCR) for UNICEF State Office, Chhattisgarh',
        description: 'Collaborative effort of CMSR Foundation and UNICEF State Office, Chhattisgarh to focus on promoting Child Rights issues. Through media workshops, field visits, mentorship and training, aimed towards collective mobilization of media, civil society, government officials and elected representatives.',
        fullText: 'This was a collaborative effort of CMSR Foundation and UNICEF State Office, Chhattisgarh to focus on promoting Child Rights issues in the state. Through media workshops, field visits, mentorship and training & capacity building of different stakeholders, this initiative aimed towards collective mobilization of media, civil society, government officials and elected representatives of Chhattisgarh to ensure children are able to enjoy their basic human rights related to education, health, nutrition and safety form violence and trafficking.',
      },
      {
        title: 'Study: Chennai Floods and Children\'s Resiliency',
        description: 'Study to understand the impact of sudden onset of climatic disaster on vulnerable urban children in context of floods which affected Chennai city in November-December, 2015. Objective was to understand risks of climate changes posed to children.',
        fullText: 'This study was commissioned in the context of the floods which affected Chennai city in November-December, 2015 and the objective was to understand the risks of climate changes posed to children in Chennai. Mostly, the study was of a qualitative nature and involved focus group discussions with children and parents from the affected zones and interviews with officials of Municipal Corporation, PHC, school staff and AWCs.',
      },
      {
        title: 'Analysis: Assembly Questions during 2013-15 for UNICEF',
        description: 'Analysis of questions raised by honourable members of Chhattisgarh Vidhan Sabha on child rights and related issues during all eight sessions from 2013-2015. Special focus on five broad areas including Reducing Neo Neonatal Deaths, Reducing Stunting, etc.',
        fullText: 'UNICEF as part of its engagement with the Vidhan Sabha of Chhattisgarh, had taken up the task of analysing questions raised by honourable members of the house on child rights and related issues. For this purpose, UNICEF required support of a research agency to analyse the questions raised during the year 2013-15 and CMSR Consultants was selected for this task. The scope of work of the organization included; analysing the questions raised during all the eight sessions from the period 2013 – 2015 and to make a comparison and prepare a report on the questions related to child rights and related issues with a special focus on the five broad areas i.e., Reducing Neo Neonatal Deaths, Reducing Stunting, Reducing Open Defecation, Protection of Children against Violence and Abuse.',
      },
      {
        title: 'Process Documentation: Child Centred Community Development Program',
        description: 'Process Documentation – Innovation & Best Practices of Child Centred Community Development Program in Bihar. Plan India with support of five partner NGOs engaged in implementation in five districts focusing on improving status of children.',
        fullText: '"Plan India" with the support of five partner NGOs was engaged in the implementation of "Child Centred Community Development (CCCD) programmes" in five districts of Bihar. The program was directed towards improving the status of children in the community by providing them access to their rights, strengthening and improving the existing Government schools to provide a better learning environment. Capacity building of Teaching faculty, Bal Sansad Members (Children\'s Parliament) and School Management Committee members were undertaken in around 200 selected schools for bringing about better studying environment and improvement in quality learning. The issues covered under the program included; how to introduce novel concepts like "Mini library", ensuring separate sanitation facilities for boys and girls, improving interior ambience of (decoration) of classrooms, promoting children\'s participation in exhibitions held by the schools, observance of important days with various social and cultural activities etc. The "Process Documentation" exercise focussed on documenting the innovation and best practices in the Education Domain. Primary research included In-depth Interviews (IDIs), Key Informants Interviews (KIIs) and Focus Group Discussions with the stakeholders. Secondary research included the review of the project documents compiled under the project to understand the extent of the interventions in accomplishing the envisaged goals / objectives.',
      },
      {
        title: 'End-line Evaluation: Child Rights studies in three districts of Uttar Pradesh',
        description: 'Child Rights Project implemented by UNICEF in three districts – Jaunpur, Mirzapur and Sonbhadra (2010-2014) with aim to create protective environment for children, with particular emphasis on their right to education and protection.',
        fullText: 'The Child Rights Project was implemented by UNICEF in three districts of Uttar Pradesh –Jaunpur, Mirzapur and Sonbhadra with an aim to create a protective environment for children, with particular emphasis on their right to education and protection. The project was initiated in 2010 and was completed in the year 2014. At the end of the assignment, CMSR Consultants in association with GFK Mode, carried out the end-line assessment in order to measure the impact of the project on the target group. The tasks included research design, pre-testing of FGDs\' tools, submission of pre-testing report including the revised research instruments, identification and training of researchers, conducting in-depth discussions (IDIs) and FGDs.',
      },
    ],
  },
  {
    category: 'WASH',
    image: 'https://images.unsplash.com/photo-1541544741670-1b8ee8b86a30?w=800&q=80',
    projects: [
      {
        title: 'End-line Assessment: Project "Improving Water and Environmental Sanitation" in Delhi',
        description: 'United Way Delhi program in selected government schools of Delhi. Focused on providing PORTA Toilets to schools and behavioral change through workshops on WASH. 133 PORTA toilets installed in 14 schools, benefitting more than 10000 students.',
        fullText: 'United Way Delhi was engaged in implementation of programs related to \'Improving Water and Environmental Sanitation\' in selected government schools of Delhi. The project focused on two major aspects i.e. i) providing PORTA Toilets to schools according to their requirements and ii) sessions on behavioral change through workshops on WASH for different stakeholders i.e., School Management Committee, School staff and Students. A total of 133 PORTA toilets were installed in 14 schools, benefitting more than 10000 students in all. The various internal assessments indicated that toilets provided in schools and sessions on WASH have largely impacted the students and schools in terms sanitation practices and behavioral change. CMSR assessed the impact of the interventions at ground level which included, usage pattern, post interventions changes in terms of school infrastructure and facilities, retention, change in knowledge, attitude and practices of the students towards sanitation and hygiene practices.',
      },
      {
        title: 'Evaluation: Truckers Engagement Project "Suhana Safar"',
        description: 'Program funded by MAERSK and implemented by Development Alternatives for improving quality of life of containerised truck drivers through training & orientation about Road safety, and WASH at Dadri and Tughlaqabad Depots. Interviewed 455 Truck Drivers and Helpers.',
        fullText: '"Suhana Safar" program was funded by MAERSK and implemented by "Development Alternatives" for improving the quality of life of the containerised truck drivers through imparting training & orientation about Road safety, and WASH at Dadri and Tughlaqabad Depots. The task of conducting an "End-line evaluation" of the "Suhana Safar" program was entrusted to CMSR Consultants for learning lessons on the outcome and impact of the program. The study involved interviewing 455 Truck Drivers and Helpers, and 50 family members of the truck drivers apart from Focus Group Discussions with community members and In-depth interviews with the representatives of Trucking Associations & Companies.',
      },
      {
        title: 'Qualitative Rapid Assessment: Women + Water Project',
        description: 'QRA done to undertake Cluster and SHG Mapping in seven selected districts of Maharashtra and Madhya Pradesh to identify communities and women\'s groups where W+W project can be implemented. Identified 20,000 functional SHGs for life skill training program.',
        fullText: 'The QRA was done to undertake the \'Cluster and SHG Mapping\' in the seven selected districts of Maharashtra and Madhya Pradesh to identify communities and women\'s groups where W+W project can be implemented. The study envisaged identifying 20,000 functional SHGs who would be interested in participating in a life skill training program by CARE India. The outcome of the Study helped in identifying "cluster of villages" wherein women organizations are functioning, in order to plan for a Program pertaining to capacity building of women about the best practices to be adopted under "WASH" (Water, Sanitation & Hygiene). These cluster of villages would be the platform for launching the capacity building program being proposed by CARE India.',
      },
    ],
  },
];

// Convert thematic areas to individual project cards
const SAMPLE_PROJECTS = THEMATIC_AREAS.flatMap((area, areaIndex) =>
  area.projects.map((project, projectIndex) => ({
    id: `${area.category.toLowerCase().replace(/\s+/g, '-')}-${projectIndex + 1}`,
    title: project.title,
    category: area.category,
    location: 'Multiple Locations, India',
    year: new Date().getFullYear() - Math.floor(Math.random() * 5),
    summary: project.description,
    results: [],
    images: [area.image],
    partners: [],
    budget: '',
    duration: '',
    contact: 'info@cmsrconsultants.com',
    fullText: project.fullText || project.description,
  }))
);

const Projects = () => {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof SAMPLE_PROJECTS[0] | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return SAMPLE_PROJECTS.filter(
      (p) =>
        (activeCategory === 'All' || p.category === activeCategory) &&
        (p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.summary.toLowerCase().includes(query.toLowerCase()))
    );
  }, [activeCategory, query]);

  const activeProject = useMemo(
    () => SAMPLE_PROJECTS.find((p) => p.id === id),
    [id]
  );

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.querySelectorAll('.project-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeCategory, query]);

  // Detail view
  if (id && activeProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-sm text-secondary font-semibold">PROJECT</span>
                <h1 className="text-3xl font-bold text-foreground">{activeProject.title}</h1>
                <div className="text-sm text-muted-foreground">{activeProject.location} · {activeProject.year}</div>
              </div>
              <Link to="/projects">
                <Button variant="outline">Back to list</Button>
              </Link>
            </div>

            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-background/50 rounded-lg overflow-hidden mb-6">
                    {activeProject.images?.[0] ? (
                      <img src={activeProject.images[0]} alt={activeProject.title} className="w-full h-64 object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{activeProject.fullText || activeProject.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Results</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {activeProject.results?.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>

                <aside className="glass-card p-4 bg-secondary/5">
                  <div className="text-sm font-semibold text-secondary mb-3">Project facts</div>
                  <dl className="text-sm text-muted-foreground space-y-2">
                    <div>
                      <dt className="font-medium text-foreground">Partners</dt>
                      <dd>{(activeProject.partners || []).join(', ') || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Budget</dt>
                      <dd>{activeProject.budget || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Duration</dt>
                      <dd>{activeProject.duration || '—'}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-foreground">Contact</dt>
                      <dd className="flex flex-col gap-2 mt-1">
                        <a
                          href={`mailto:${activeProject.contact || 'gajendra@cmsrconsultants.com'}`}
                          className="text-secondary hover:underline flex items-center gap-1"
                        >
                          <Mail size={14} />
                          {activeProject.contact || 'gajendra@cmsrconsultants.com'}
                        </a>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${activeProject.contact || 'gajendra@cmsrconsultants.com'}&su=Inquiry about ${encodeURIComponent(activeProject.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:underline flex items-center gap-1 text-xs"
                        >
                          <ExternalLink size={12} />
                          Send via Gmail
                        </a>
                      </dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main ref={contentRef} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
              PROJECTS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6">
              All Projects
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Filter by theme or search titles & summaries
            </p>
          </div>

          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-full text-sm bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card bg-white rounded-xl overflow-hidden group hover:shadow-xl border border-slate-100 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.images?.[0] || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white text-primary shadow-sm border border-slate-100">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-serif font-bold text-primary mb-3 leading-tight group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-secondary" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-secondary" />
                      {project.year}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{project.summary}</p>
                  <Button
                    className="w-full bg-slate-50 text-primary hover:bg-primary hover:text-white border border-slate-200 transition-all duration-300 font-semibold"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">No projects found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>

      {/* Project Details Popup */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => {
        if (!open) {
          setSelectedProject(null);
        }
      }}>
        <DialogContent
          className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white border-none shadow-2xl p-0 cursor-default"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'auto',
          }}
        >
          {selectedProject && (
            <div className="flex flex-col h-full">
              <div className="relative h-64 md:h-80 w-full overflow-hidden shrink-0">
                <img
                  src={selectedProject.images?.[0] || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-8">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-secondary text-primary mb-3 w-fit">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {selectedProject.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {selectedProject.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-primary mb-3">Project Summary</h4>
                      <p className="text-slate-600 leading-relaxed">
                        {selectedProject.fullText || selectedProject.summary}
                      </p>
                    </div>

                    {selectedProject.results && selectedProject.results.length > 0 && (
                      <div>
                        <h4 className="text-lg font-serif font-bold text-primary mb-3">Key Results</h4>
                        <ul className="space-y-3">
                          {selectedProject.results.map((result, i) => (
                            <li key={i} className="flex items-start text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0" />
                              <span className="leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 h-fit">
                    <h4 className="font-bold text-primary mb-4 border-b border-slate-200 pb-2">Project Details</h4>
                    <dl className="space-y-4 text-sm">
                      {(selectedProject.partners && selectedProject.partners.length > 0) && (
                        <div>
                          <dt className="text-slate-500 mb-1">Partners</dt>
                          <dd className="font-medium text-slate-800">{selectedProject.partners.join(', ')}</dd>
                        </div>
                      )}
                      {selectedProject.budget && (
                        <div>
                          <dt className="text-slate-500 mb-1">Budget</dt>
                          <dd className="font-medium text-slate-800">{selectedProject.budget}</dd>
                        </div>
                      )}
                      {selectedProject.duration && (
                        <div>
                          <dt className="text-slate-500 mb-1">Duration</dt>
                          <dd className="font-medium text-slate-800">{selectedProject.duration}</dd>
                        </div>
                      )}
                      {selectedProject.contact && (
                        <div>
                          <dt className="text-slate-500 mb-1">Contact</dt>
                          <dd className="space-y-2">
                            <a
                              href={`mailto:${selectedProject.contact}`}
                              className="flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
                            >
                              <Mail size={14} />
                              Email Us
                            </a>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Projects;
