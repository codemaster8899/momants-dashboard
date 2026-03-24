export interface InformationItem {
  answered: number;
  total: number;
  id: string;
  name: string;
}

export interface InformationResponse {
  items: InformationItem[];
  count: number;
}

export interface QuestionItem {
  question: string;
  answer: string;
  answered: boolean;
  id: string;
  nextId: string;
  previousId: string;
}

export interface QuestionResponse {
  items: QuestionItem[];
  count: number;
}

export interface ITrainingCategory {
  category_name: string;
  completed_count: number;
  total_count: number;
}

export interface ITrainingItem {
  qa_file_id: string;
  category: string;
  question: string;
  answer: string;
  trained: boolean;
}

export interface ITrainingResponse {
  qa_files: ITrainingItem[];
  total_percentage: number;
  categories: ITrainingCategory[];
  trained_count: number;
  open_count: number;
}